from astrapy import DataAPIClient
import pandas as pd
import joblib
import datetime
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

BASE_API_URL = os.getenv("BASE_API_URL")
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
ASTRA_DB_TOKEN = os.getenv("ASTRA_DB_TOKEN")
ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
FLOW_ID_1 = os.getenv("FLOW_ID_1")
APPLICATION_TOKEN_1 = os.getenv("APPLICATION_TOKEN_1")
FLOW_ID_2 = os.getenv("FLOW_ID_2")
APPLICATION_TOKEN_2 = os.getenv("APPLICATION_TOKEN_2")
FLOW_ID_3 = os.getenv("FLOW_ID_3")
APPLICATION_TOKEN_3 = os.getenv("APPLICATION_TOKEN_3")
FLOW_ID_4 = os.getenv("FLOW_ID_4")
APPLICATION_TOKEN_4 = os.getenv("APPLICATION_TOKEN_4")
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")
FLOW_ID_5 = os.getenv("FLOW_ID_5")
APPLICATION_TOKEN_5 = os.getenv("APPLICATION_TOKEN_5")

def verifyConnectionToAstraDB():
    client = DataAPIClient(ASTRA_DB_TOKEN)
    db = client.get_database_by_api_endpoint(ASTRA_DB_API_ENDPOINT)
    print(f"Connected to Astra DB: {db.list_collection_names()}")

def getTimeStampOutput():
    loaded_model = joblib.load('tweet_engagement_classifier.pkl')
    print("Model loaded successfully")
    now = datetime.datetime.now()
    current_features = pd.DataFrame([[now.hour, now.weekday()]],
                                columns=['Hour', 'DayOfWeek'])
    prediction = loaded_model.predict(current_features)
    return prediction[0]
    
def run_flow_for_timestamp(message: str,) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID_1}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN_1}",
        "Content-Type": "application/json"
    }
    response = requests.post(api_url, json=payload, headers=headers)
    if not response.ok:
        print("Error:", response.status_code, response.text)
    return response.json()

def getCurrentTimeStamp():
    return datetime.datetime.now()

def combined_flow_output_timestamp():
    classifier_output = getTimeStampOutput() # 0/1
    timestamp = getCurrentTimeStamp()
    response = run_flow_for_timestamp("Decision: {}, timestamp: {}".format(classifier_output, timestamp))
    json_output = response['outputs'][0]['outputs'][0]['results']['message']['text']
    return json_output

def run_flow_contentSuggestor(message: str) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID_2}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN_2}",
        "Content-Type": "application/json"
    }
    response = requests.post(api_url, json=payload, headers=headers)
    if not response.ok:
        print("Error:", response.status_code, response.text)

    output = response.json()
    return output['outputs'][0]['outputs'][0]['results']['message']['text']

def run_flow_postAnalyzer(message: str,) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID_3}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN_3}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(api_url, json=payload, headers=headers)
    if not response.ok:
        print("Error:", response.status_code, response.text)
    output = response.json()
    return output['outputs'][0]['outputs'][0]['results']['message']['text']

def run_flow_postType(message: str) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID_4}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN_4}",
        "Content-Type": "application/json"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    if not response.ok:
        print("Error:", response.status_code, response.text)
    return response.json()['outputs'][0]['outputs'][0]['results']['message']['text']

def retrieveTweetComments(TWEET_ID = "1866869309277937937"):
    headers = {
        "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"
    }

    url = f"https://api.twitter.com/2/tweets/search/recent"

    params = {
        "query": f"conversation_id:{TWEET_ID}",  
        "tweet.fields": "public_metrics,author_id",  
        "max_results": 100 
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        tweets = data.get("data", [])
        
        sorted_tweets = sorted(
            tweets, 
            key=lambda x: x["public_metrics"]["like_count"], 
            reverse=True
        )
        
        top_50 = sorted_tweets[:50]
        tweet_text = []
        for i, tweet in enumerate(top_50, 1):
            tweet_text.append(tweet['text'])
            # Likes: tweet['public_metrics']['like_count']
    else:
        print(f"Error: {response.status_code}, {response.text}")
    return str(tweet_text)

def run_flow_sentimentAnalysis(message: str,) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID_5}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN_5}",
        "Content-Type": "application/json"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    if not response.ok:
        print("Error:", response.status_code, response.text)
    res = response.json()['outputs'][0]['outputs'][0]['results']['message']['text']
    json_res = json.loads(res)
    return json_res