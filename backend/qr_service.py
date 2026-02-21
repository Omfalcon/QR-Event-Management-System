"""QR validation service"""
from flask import jsonify
from config import participants, ADMIN_UUID
from validators import is_valid_uuid, is_admin_qr

def validate_qr(data):
    if not data or "uuid" not in data:
        return jsonify({"error": "Missing UUID"}), 400

    # ---- Admin QR check (must come before uuid-only validation) ----
    if is_admin_qr(data):
        return jsonify({
            "valid": True,
            "is_admin": True,
            "uuid": ADMIN_UUID,
            "name": "Admin",
            "email": "",
            "phone": ""
        })

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
        "is_admin": False,
        "uuid": uuid,
        "name": participant.get("name"),
        "email": participant.get("email"),
        "phone": participant.get("phone")
    })
