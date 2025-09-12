import pandas as pd
from pymongo import MongoClient

import os
# 1Connect to MongoDB
from dotenv import load_dotenv
load_dotenv()  # This reads your .env file


client = MongoClient(os.getenv("DB_PATH"))
db = client["healthcareDB"]
print(client.list_database_names())  # should show 'healthcareDB'
print(db.list_collection_names())    # should show ['diseases', ...]


# Access the collection directly
diseases_collection = db["diseases"]

# Read all cases
cases = list(diseases_collection.find({}))
df = pd.DataFrame(cases)


# # 3️Fill missing values
# important_cols = ['Age', 'City', 'Disease', 'Sex']
# for col in important_cols:
#     if col in df.columns:
#         if pd.api.types.is_numeric_dtype(df[col]):
#             df[col] = df[col].fillna(df[col].median())
#         else:
#             df[col] = df[col].fillna('Unknown')


# 4️ Remove duplicates
df = df.drop_duplicates()

# 5️ Fix data types
if 'Age' in df.columns:
    df['Age'] = df['Age'].astype(int)

if 'Date' in df.columns:
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

# 6️ Standardize text
for col in ['Disease', 'City', 'Sex']:
    if col in df.columns:
        df[col] = df[col].str.lower().str.strip()

# 7️ Add age groups (optional)
if 'Age' in df.columns:
    df['AgeGroup'] = pd.cut(
        df['Age'], bins=[0, 12, 18, 35, 60, 100],
        labels=['Child', 'Teen', 'Adult', 'Middle', 'Senior']
    )

# 8️ Drop 'Notes' column if it exists
if 'Notes' in df.columns:
    df = df.drop(columns=['Notes'])

# 9️ Save cleaned CSV (optional)
df.to_csv(r"C:\Users\garvt\Downloads\report_clean.csv", index=False)



#Save to a new collection (if you want to keep original)
db.cleaned_cases.insert_many(df.to_dict('records'))
