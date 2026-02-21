import os
from dotenv import load_dotenv
from pymongo import MongoClient

# ================= LOAD ENV =================
load_dotenv()

# ================= JWT CONFIG =================
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET_KEY:
    raise ValueError("No JWT_SECRET_KEY set for Flask application")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", 24))

# ================= ADMIN QR CONFIG =================
ADMIN_UUID = os.getenv("ADMIN_UUID")
ADMIN_PASS = os.getenv("ADMIN_PASS")

# ================= MONGO CONFIG =================
MONGO_URI = os.getenv("MONGO_URI")
mongo = MongoClient(MONGO_URI)

db = mongo.iyrc
users = db.users
qr_entries = db.qr_entries
participants = db.participants
scan_logs = db.scan_logs
keynotes = db.keynotes
admin_scan_counts = db.admin_scan_counts  # tracks per (day, type) count

# 🔐 Create unique indexes
users.create_index("username", unique=True)
qr_entries.create_index("uuid", unique=True)

# Compound unique index for scan logs
scan_logs.create_index(
    [
        ("uuid", 1),
        ("day", 1),
        ("type", 1),
        ("slot", 1),
        ("room", 1)
    ],
    unique=True
)

# Unique index for admin scan counts
admin_scan_counts.create_index(
    [("day", 1), ("type", 1)],
    unique=True
)
