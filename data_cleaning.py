import pandas as pd
from difflib import SequenceMatcher

def is_similar(a, b):
    similarity = SequenceMatcher(None, a, b).ratio()
    return similarity > 0.9

def create_bins(df):
    bins = []
    for i in range(len(df)):
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

            print("Messages in bin:")
            for index in bin_indices:
                if index not in filtered_indices and index != latest_index: 
                    print(df.loc[index, 'Message'], "[DROPPED]")
                else: 
                    print(df.loc[index, 'Message'])
            print()
            
            df.drop(index=[idx for idx in bin_indices if idx not in filtered_indices and idx != latest_index], inplace=True)
    return df

df = pd.read_csv('../traffic_data.csv')
original_df = df.copy()

df['Content'] = df['Message'].str.split(n=1).str[1]
df['Timestamp'] = df['Message'].str.split(n=1).str[0]
df['Time'] = df['Message'].str.split(')').str[1].str.split().str[0]
df['Time'] = pd.to_datetime(df['Time'], format='%H:%M')

bins = create_bins(df)
filtered_df = drop_duplicates_from_bins(df, bins)

print("Original count:", len(original_df))
print("Filtered count:", len(filtered_df))
