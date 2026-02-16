import bcrypt
from config import users
from datetime import datetime

def seed_super_admin():
    print("🚀 Seeding Super Admin user...")
    
    username = "shubhi"
    password = "password123" # User should change this!
    
    existing = users.find_one({"username": username})
    if existing:
        print(f"⚠️ User '{username}' already exists. Skipping.")
        return

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "username": username,
        "password": hashed_password,
        "role": "superadmin",
        "created_at": datetime.utcnow()
    }
    
    users.insert_one(user_data)
    print(f"✅ Created Super Admin: {username} / {password}")

if __name__ == "__main__":
    seed_super_admin()
