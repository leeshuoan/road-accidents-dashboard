import json
import boto3
import pandas as pd
import requests
from datetime import datetime
from io import StringIO
from io import BytesIO

def lambda_handler(event, context):
    s3_bucket = 'visualanalyticsdataset'
    s3_key = 'traffic_data.csv'

    s3 = boto3.client('s3')
    
    try:
        response = s3.get_object(Bucket=s3_bucket, Key=s3_key)
        content = response['Body'].read()
        existing_df = pd.read_csv(BytesIO(content))
    except Exception as e:
        existing_df = pd.DataFrame()
        
    print(existing_df)
        
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

        response_df = pd.DataFrame(formatted_data)
        new_df = pd.concat([existing_df, response_df], ignore_index=True)
        save_df = new_df.drop_duplicates(subset=["Message"])

        csv_buffer = StringIO()
        save_df.to_csv(csv_buffer, index=False)
        s3.put_object(Body=csv_buffer.getvalue(), Bucket=s3_bucket, Key=s3_key)

        print(f"Data saved to S3 bucket: s3://{s3_bucket}/{s3_key}")

    return {
        'statusCode': 200,
        'body': json.dumps('Data saved to S3 successfully!')
    }
