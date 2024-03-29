import json
import boto3
import pandas as pd
import requests
from datetime import datetime
from difflib import SequenceMatcher
from io import StringIO
from io import BytesIO

def lambda_handler(event, context):
    s3_bucket = 'visualanalyticsdataset'
    s3_key = 'traffic_data.csv'
    bin_number = 5

    s3 = boto3.client('s3')
    
    def is_similar(a, b):
        similarity = SequenceMatcher(None, a, b).ratio()
        return similarity > 0.85
    
    def create_bins(df, bin_number):
        bins = []
        for i in range(len(df)-bin_number, len(df)):
            found_bin = False
            for bin_indices in bins:
                if is_similar(df.loc[i, 'Message'], df.loc[bin_indices[0], 'Message']):
                    bin_indices.append(i)
                    found_bin = True
                    break
            if not found_bin:
                bins.append([i])
        return bins
    
    def drop_duplicates_from_bins(df, bins):
        for bin_indices in bins:
            if len(bin_indices) > 1:
                latest_index = max(bin_indices, key=lambda x: df.loc[x, 'Time'])
                latest_timestamp = df.loc[latest_index, 'Time']
                filtered_indices = [idx for idx in bin_indices if (latest_timestamp - df.loc[idx, 'Time']).total_seconds() >= 1800]
                df.drop(index=[idx for idx in bin_indices if idx not in filtered_indices and idx != latest_index], inplace=True)
        return df
    
    try:
        response = s3.get_object(Bucket=s3_bucket, Key=s3_key)
        content = response['Body'].read()
        existing_df = pd.read_csv(BytesIO(content))
    except Exception as e:
        existing_df = pd.DataFrame()
        
    url = "http://datamall2.mytransport.sg/ltaodataservice/TrafficIncidents"
    headers = {
        'accountKey': 'TuzIH786RrOyBW2JMW1Cag==',
        'accept': 'application/json'
    }
    
    try:
        response = requests.get(url, headers=headers, params=None)
        response.raise_for_status() 
        response_data = response.json()
    except requests.exceptions.RequestException as e:
        print("Error making API call:", e)
        response_data = None

    if response_data:
        current_datetime = datetime.now().strftime("%Y-%m-%d_%H:%M")
        formatted_data = [
            {
                "Type": item["Type"],
                "Latitude": item["Latitude"],
                "Longitude": item["Longitude"],
                "Message": item["Message"],
                "CurrentDatetime": current_datetime
            }
            for item in response_data["value"]
            if item["Type"] == "Accident"
        ]
        bin_number += len(formatted_data)
        print(formatted_data)
        print(bin_number)

        response_df = pd.DataFrame(formatted_data)
        df = pd.concat([existing_df, response_df], ignore_index=True)
        df = df.drop_duplicates(subset=["Message"])

        
        df['Content'] = df['Message'].str.split(n=1).str[1]
        df['Timestamp'] = df['Message'].str.split(n=1).str[0]
        df[['Date', 'Time']] = df['Timestamp'].str.split(')', expand=True)
        df['Date'] = df['Date'].str.strip('(') + '/2024'
        df['Timestamp'] = pd.to_datetime(df['Date'] + ' ' + df['Time'], format='%d/%m/%Y %H:%M')
        df['Time'] = pd.to_datetime(df['Time'], format='%H:%M')

        bins = create_bins(df, bin_number)
        for i, bin_indices in enumerate(bins):
            bin_messages = [df.loc[idx, 'Message'] for idx in bin_indices]
            print(f"Messages in bin {i+1}: {bin_messages}")
        filtered_df = drop_duplicates_from_bins(df, bins)
        filtered_df = filtered_df.drop(columns=['Date', 'Time'])

        csv_buffer = StringIO()
        filtered_df.to_csv(csv_buffer, index=False)
        s3.put_object(Body=csv_buffer.getvalue(), Bucket=s3_bucket, Key=s3_key)

        print(f"Data saved to S3 bucket: s3://{s3_bucket}/{s3_key}")

    return {
        'statusCode': 200,
        'body': json.dumps('Data saved to S3 successfully!')
    }