"""Authentication service for user registration and login"""
from flask import jsonify
import jwt
import bcrypt
from datetime import datetime, timedelta
from config import users, JWT_SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRATION_HOURS
from validators import is_valid_password


def register_user(data):
    """Register a new user with username and password"""
    if not data:
        return jsonify({"error": "Missing data"}), 400
    
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 8 characters"}), 400
    
    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "username": username,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    users.insert_one(user_data)
    
    return jsonify({
        "message": "User registered successfully",
        "username": username
    }), 201


def login_user(data):
    """Login user and return JWT token"""
    if not data:
        return jsonify({"error": "Missing data"}), 400
    
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    
    user = users.find_one({"username": username})
    
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    
    payload = {
        "username": username,
        "role": user.get("role", "manager"), 
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "username": username,
        "role": user.get("role", "manager")
    }), 200


def create_manager(data, current_user):
    """Create a new manager (Only Super Admin can do this)"""
    if current_user.get("role") != "superadmin":
        return jsonify({"error": "Unauthorized. Only Super Admins can create managers."}), 403

    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
        
    if users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409
        
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user_data = {
        "username": username,
        "password": hashed_password,
        "role": "manager",
        "created_at": datetime.utcnow()
    }
    
    try:
        users.insert_one(user_data)
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
    
    return jsonify({
        "message": "Manager created successfully",
        "username": username
    }), 201


def get_current_user(username):
    """Get current user information"""
    user = users.find_one({"username": username}, {"_id": 0, "password": 0})
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user), 200


def get_all_managers():
    """Get all users with role 'manager'"""
    try:
        managers = list(users.find({"role": "manager"}, {"password": 0}))
        # Convert ObjectId to string for JSON serialization
        for m in managers:
            m["_id"] = str(m["_id"])
        return jsonify(managers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def update_manager(manager_id, data):
    """Update manager username or password"""
    from bson import ObjectId
    
    if not ObjectId.is_valid(manager_id):
        return jsonify({"error": "Invalid Manager ID"}), 400

    update_fields = {}
    if "username" in data and data["username"]:
        # Check if username exists (excluding current user)
        existing = users.find_one({"username": data["username"], "_id": {"$ne": ObjectId(manager_id)}})
        if existing:
            return jsonify({"error": "Username already taken"}), 409
        update_fields["username"] = data["username"]

    if "password" in data and data["password"]:
        if not is_valid_password(data["password"]):
            return jsonify({"error": "Password must be at least 8 characters"}), 400
        update_fields["password"] = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())

    if not update_fields:
        return jsonify({"message": "No changes made"}), 200

    result = users.update_one({"_id": ObjectId(manager_id)}, {"$set": update_fields})
    
    if result.matched_count == 0:
        return jsonify({"error": "Manager not found"}), 404

    return jsonify({"message": "Manager updated successfully"}), 200


def delete_manager(manager_id):
    """Delete a manager"""
    from bson import ObjectId

    if not ObjectId.is_valid(manager_id):
        return jsonify({"error": "Invalid Manager ID"}), 400

    result = users.delete_one({"_id": ObjectId(manager_id), "role": "manager"})

    if result.deleted_count == 0:
        return jsonify({"error": "Manager not found or not a manager"}), 404

    return jsonify({"message": "Manager deleted successfully"}), 200
