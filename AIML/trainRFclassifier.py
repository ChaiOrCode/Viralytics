from astrapy import DataAPIClient
import pandas as pd
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder

def trainAndTest():
    client = DataAPIClient("AstraCS:uLCgudnfoZASrpwOJxoijNaq:0003c5d7654100f77f3714e9b0bdd089e777ecfcb42fe2765b20628b19cab144")
    db = client.get_database_by_api_endpoint(
    "https://ef7bbff0-2382-44bc-b2d8-c9a757b7a149-us-east-2.apps.astra.datastax.com"
    )
    collection = db.get_collection("timestamp_analysis_data")
    
    documents = list(collection.find({}))

    df = pd.DataFrame(documents)
    print(df.head())
    data = df

    data['Timestamp'] = pd.to_datetime(data['Timestamp'])
    data['Hour'] = data['Timestamp'].dt.hour
    data['DayOfWeek'] = data['Timestamp'].dt.dayofweek
    data['Engagement'] = data['Retweets'] + data['Likes']

    threshold = data['Engagement'].mean()
    data['GoodEngagement'] = (data['Engagement'] > threshold).astype(int)

    print(data['GoodEngagement'].value_counts())

    X = data[['Hour', 'DayOfWeek']]
    y = data['GoodEngagement']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))
    return model

# Predict for current time
# import datetime
# now = datetime.datetime.now()
# current_features = pd.DataFrame([[now.hour, now.weekday()]],
#                                columns=['Hour', 'DayOfWeek'])
# prediction = model.predict(current_features)
# if(prediction[0] == 1):
#   print('Post Now')
# else:
#   print('Do not post now')

def descFeatureImportance(model):
    importances = model.feature_importances_
    feature_names = ['Hour', 'DayOfWeek']
    feature_importances = dict(zip(feature_names, importances))

    print(f"Impact of Hour: {feature_importances['Hour']}")
    print(f"Impact of DayOfWeek: {feature_importances['DayOfWeek']}")

    plt.bar(feature_names, importances)
    plt.xlabel("Features")
    plt.ylabel("Importance")
    plt.title("Feature Importance in Tweet Engagement Classifier")
    plt.show()

def saveModel(model):
   joblib.dump(model, 'tweet_engagement_classifier.pkl')
   print("Model saved as 'tweet_engagement_classifier.pkl'")
   
def testModelForAllVals():
   loaded_model = joblib.load('/content/tweet_engagement_classifier.pkl')
   for hour in range(24):
      for day in range(7):
        current_features = pd.DataFrame([[hour, day]],
                                    columns=['Hour', 'DayOfWeek'])
        prediction = loaded_model.predict(current_features)
        if prediction[0] == 1:
            print(f"The classifier suggests posting at {hour}:00 on day {day} (Monday=0, Sunday=6)")
            break  
        else:
           print(f"Dont post at {hour}:00 on day {day} (Monday=0, Sunday=6)")