"""QR validation service"""
from flask import jsonify
from config import participants
from validators import is_valid_uuid

def validate_qr(data):
    if not data or "uuid" not in data:
        return jsonify({"error": "Missing UUID"}), 400
    
    uuid = data.get("uuid")
    
    if not is_valid_uuid(uuid):
        return jsonify({"error": "Invalid UUID format"}), 400
    
    # Check participants collection
    participant = participants.find_one(
        {"uuid": str(uuid)},
        {"_id": 0, "name": 1, "email": 1, "phone": 1}
    )
    
    if not participant:
        return jsonify({"error": "Invalid QR / User not found"}), 404
    
    return jsonify({
        "valid": True,
        "uuid": uuid,
        "name": participant.get("name"),
        "email": participant.get("email"),
        "phone": participant.get("phone")
    })
