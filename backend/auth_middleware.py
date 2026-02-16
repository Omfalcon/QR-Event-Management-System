"""JWT authentication middleware"""
import os
import jwt
from functools import wraps
from flask import request, jsonify


from config import JWT_SECRET_KEY, JWT_ALGORITHM


def require_auth(f):
    """Decorator to require JWT authentication for endpoints"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({"error": "Missing authorization header"}), 401
        
        parts = auth_header.split()
        
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({"error": "Invalid authorization format"}), 401
        
        token = parts[1]
        
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            
            # CRITICAL SECURITY FIX: Check if user actually exists in DB
            from config import users
            if not users.find_one({"username": payload["username"]}):
                 return jsonify({"error": "User access revoked"}), 401

            request.current_user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function
