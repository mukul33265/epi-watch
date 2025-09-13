import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# --- Connect to MongoDB ---
client = MongoClient(os.getenv("DB_PATH"))
db = client["healthcareDB"]
print("Databases:", client.list_database_names())
print("Collections:", db.list_collection_names())

# --- Read all cases ---
cases = list(db["diseases"].find({}))
df = pd.DataFrame(cases)

# --- Print to verify columns ---
print("Columns from Mongo:", df.columns.tolist())

# --- Rename columns to consistent names ---
df = df.rename(columns={
    'city': 'City',
    'disease': 'Disease',
    'sex': 'Sex',
    'age': 'Age',
    'date': 'Date',
    'notes': 'Notes'
})

# --- Fill missing values ---
for col in ['Age', 'City', 'Disease', 'Sex']:
    if col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            df[col] = df[col].fillna(df[col].median())
        else:
            df[col] = df[col].fillna('Unknown')

# --- Remove duplicates ---
df = df.drop_duplicates()

# --- Fix data types ---
if 'Age' in df.columns:
    df['Age'] = df['Age'].astype(int)

if 'Date' in df.columns:
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

# --- Standardize text ---
for col in ['Disease', 'City', 'Sex']:
    if col in df.columns:
        df[col] = df[col].str.lower().str.strip()

# --- Add age groups ---
if 'Age' in df.columns:
    df['AgeGroup'] = pd.cut(
        df['Age'], bins=[0, 12, 18, 35, 60, 100],
        labels=['Child', 'Teen', 'Adult', 'Middle', 'Senior']
    )

# --- Drop Notes if exists ---
if 'Notes' in df.columns:
    df = df.drop(columns=['Notes'])

# --- Group by City + Disease ---
if all(col in df.columns for col in ['City', 'Disease']):
    grouped_df = (
        df.groupby(['City', 'Disease'])
          .size()
          .reset_index(name='Cases')
    )
else:
    raise ValueError(f"Missing expected columns. Found: {df.columns.tolist()}")

# --- Drop _id if exists ---
if '_id' in grouped_df.columns:
    grouped_df = grouped_df.drop(columns=['_id'])

# --- Clear old data and insert grouped ---
db.cleaned_cases.delete_many({})
db.cleaned_cases.insert_many(grouped_df.to_dict('records'))

# --- Also export to CSV ---
grouped_df.to_csv(r"C:\Users\garvt\Downloads\report_clean.csv", index=False)

print("✅ Grouped data saved to Mongo and CSV.")
