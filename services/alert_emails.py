import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from pymongo import MongoClient
from dotenv import load_dotenv

# --- Load ENV ---
load_dotenv()
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
DB_PATH = os.getenv("DB_PATH")
TO_EMAIL = os.getenv("ALERT_EMAIL", "garvtayal777@gmail.com")

# --- MongoDB ---
mongo_client = MongoClient(DB_PATH)
collection = mongo_client["healthcareDB"]["intense_cases"]

def generate_html(disease, cases, severity, city):
    return f"""
    <html>
    <body style="font-family: Arial, sans-serif; background:#f8f8f8; padding:20px;">
      <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:8px;">
        <h2 style="color:#c0392b;">⚠ Disease Alert</h2>
        <p><strong>Disease:</strong> {disease}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Reported Cases:</strong> {cases}</p>
        <p><strong>Severity:</strong> {severity}</p>
        <p>Please take immediate precautions and inform local health authorities.</p>
      </div>
    </body>
    </html>
    """

def send_email(disease, cases, severity, city):
    html_content = generate_html(disease, cases, severity, city)
    subject = f"🚨 {severity} {disease.title()} Outbreak Alert"

    message = Mail(
        from_email='tayalgarv777@gmail.com',
        to_emails=TO_EMAIL,
        subject=subject,
        html_content=html_content
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        resp = sg.send(message)
        if 200 <= resp.status_code < 300:
            print(f"✅ Email sent for {disease} in {city}")
        else:
            print(f"⚠ Email failed: {resp.status_code}")
    except Exception as e:
        print("❌ Error sending email:", e)

def process_intense_cases():
    for case in collection.find({}):
        # Adjust keys to match your actual DB field names
        disease = case.get("disease") or case.get("Disease")
        city = case.get("city") or case.get("City")
        count = case.get("case_count") or case.get("Cases") or 0

        if disease and city:
            send_email(disease, count, "Intense", city)
        else:
            print("⚠ Skipped invalid record:", case)

if __name__ == "__main__":
    process_intense_cases()
