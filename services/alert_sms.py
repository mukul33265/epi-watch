import os
import pandas as pd
from pymongo import MongoClient
from twilio.rest import Client as TwilioClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv("DB_PATH"))
db = client["healthcareDB"]
intense_db = db["intense_cases"]

# Load intense cases
cases = list(intense_db.find({}))
df = pd.DataFrame(cases)
print(f"✅ Loaded {len(df)} intense cases")
print("Columns in DataFrame:", df.columns.tolist())

if df.empty:
    print("⚠️ No intense cases found. Exiting.")
    exit()

# Twilio setup
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")
alert_numbers = [os.getenv("ALERT_PHONE_NUMBER")]

twilio_client = TwilioClient(account_sid, auth_token)

# Use the existing case_count column
threshold = 35
outbreaks = df[df['case_count'] >= threshold]

if outbreaks.empty:
    print("✅ No outbreaks above threshold. No SMS sent.")
    exit()

# Send SMS alerts
for _, row in outbreaks.iterrows():
    city = row['city']
    disease = row['disease']
    message = f"⚠️ Disease Alert: {disease.title()} outbreak in {city.title()}! ({row['case_count']} cases)"

    for number in alert_numbers:
        twilio_client.messages.create(
            body=message,
            from_=twilio_number,
            to=number
        )

    # Mark all intense cases in this city/disease as SMS sent
    intense_db.update_many(
        {'city': city, 'disease': disease, 'sms_sent': {'$ne': True}},
        {'$set': {'sms_sent': True}}
    )

print("✅ SMS alerts sent for intense outbreaks")
