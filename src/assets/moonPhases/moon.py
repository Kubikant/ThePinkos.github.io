import requests
import json
from datetime import datetime, timedelta

def download_json(url):
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad status codes
    return response.json()

def add_one_hour_to_date(data):
    for entry in data:
        if 'Date' in entry:
            date = datetime.strptime(entry['Date'], '%Y-%m-%dT%H:%M:%S')
            date += timedelta(hours=1)
            entry['Date'] = date.strftime('%Y-%m-%dT%H:%M:%S')
    return data

combined_data = []

for year in range(2023, 2030):
    url = f"https://craigchamberlain.github.io/moon-data/api/moon-phase-data/{year}"
    data = download_json(url)
    data = add_one_hour_to_date(data)
    combined_data.extend(data)  # Assuming the data is a list

with open('./phases.json', 'w') as outfile:
    json.dump(combined_data, outfile, indent=4)