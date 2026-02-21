"""Scan confirmation service"""
from flask import jsonify
from pymongo.errors import DuplicateKeyError
from datetime import datetime
import pytz
from config import scan_logs, admin_scan_counts, ADMIN_UUID
from validators import is_valid_uuid, is_valid_day, is_valid_type, is_valid_room, is_valid_slot

"""Confirms a scan and logs it to database"""
def confirm_scan(data):

    if not data:
        return jsonify({"error": "Missing data"}), 400

    uuid = data.get("uuid")
    day = data.get("day")
    scan_type = data.get("type")
    slot = data.get("slot")
    room = data.get("room")
    is_admin = data.get("is_admin", False)

    if not is_valid_uuid(uuid):
        return jsonify({"error": "Invalid UUID format"}), 400

    if not is_valid_day(day):
        return jsonify({"error": "Invalid day (must be 1, 2, or 3)"}), 400

    if not is_valid_type(scan_type):
        return jsonify({"error": "Invalid scan type"}), 400

    if room and not is_valid_room(room):
        return jsonify({"error": "Invalid room"}), 400

    if slot and not is_valid_slot(slot):
        return jsonify({"error": "Invalid slot"}), 400

    if is_admin and str(uuid) == str(ADMIN_UUID):
        try:
            result = admin_scan_counts.find_one_and_update(
                {"day": int(day), "type": str(scan_type)},
                {"$inc": {"count": 1}},
                upsert=True,
                return_document=True
            )
            count = result["count"] if result else 1
            return jsonify({"message": f"✅ Admin Scan #{count}", "count": count}), 200
        except Exception:
            return jsonify({"error": "Internal server error"}), 500

    # Regular scan
    try:
        ist = pytz.timezone('Asia/Kolkata')

        scan_data = {
            "uuid": str(uuid),
            "day": int(day),
            "type": str(scan_type),
            "scanned_at": datetime.now(ist)
        }

        if slot:
            scan_data["slot"] = str(slot)
        if room:
            scan_data["room"] = str(room)

        scan_logs.insert_one(scan_data)
        return jsonify({"message": "✅ Scan successful"}), 200

    except DuplicateKeyError:
        return jsonify({"message": "⚠️ Already scanned"}), 409
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
