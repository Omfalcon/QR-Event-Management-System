from datetime import datetime, timedelta
import random
import uuid
from pymongo import MongoClient
import pytz

# 🔹 Update this if needed
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "iyrc"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

scan_logs = db["scan_logs"]

rooms = ["Mac", "1005", "1006", "AB1", "BUZZ", "Trust Room"]
food_slots = ["morning-tea", "lunch", "afternoon-tea"]

TOTAL_LOGS = 250   # 👈 change this number

for i in range(TOTAL_LOGS):
    is_attendance = random.choice([True, False])

    log = {
        "uuid": str(uuid.uuid4()),
        "day": random.choice([1, 2, 3]),
        "scanned_at": datetime.utcnow() - timedelta(minutes=random.randint(0, 500))
    }

    if is_attendance:
        log["type"] = "attendance"
        log["room"] = random.choice(rooms)
    else:
        log["type"] = random.choice(food_slots)

    scan_logs.insert_one(log)

print(f"✅ Inserted {TOTAL_LOGS} dummy logs successfully.")