import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

# --- Connect to MongoDB ---
client = MongoClient(os.getenv("DB_PATH"))
db = client["healthcareDB"]
cases_collection = db["diseases"]

# --- Load all cases ---
cases = list(cases_collection.find({}))
df = pd.DataFrame(cases)
print(f"✅ Loaded {len(df)} cases")
if len(df) == 0:
    exit("No cases found!")

# Ensure columns are lowercase
df.columns = [c.lower() for c in df.columns]

# --- Group by city + disease and count ---
city_disease_counts = df.groupby(['city', 'disease']).size().reset_index(name='case_count')

# --- Split based on thresholds ---
threshold_intense = 40
threshold_moderate = 20

intense_df = city_disease_counts[city_disease_counts['case_count'] >= threshold_intense]
moderate_df = city_disease_counts[
    (city_disease_counts['case_count'] >= threshold_moderate) &
    (city_disease_counts['case_count'] < threshold_intense)
]
minimal_df = city_disease_counts[city_disease_counts['case_count'] < threshold_moderate]

print("Intense cities/diseases:\n", intense_df)
print("Moderate cities/diseases:\n", moderate_df)
print("Minimal cities/diseases:\n", minimal_df)

# --- Save to collections ---
db.intense_cases.delete_many({})
db.moderate_cases.delete_many({})
db.minimal_cases.delete_many({})

if not intense_df.empty:
    db.intense_cases.insert_many(intense_df.to_dict('records'))
if not moderate_df.empty:
    db.moderate_cases.insert_many(moderate_df.to_dict('records'))
if not minimal_df.empty:
    db.minimal_cases.insert_many(minimal_df.to_dict('records'))

print("✅ Split data saved to MongoDB collections")
