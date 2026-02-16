"""Logs retrieval service"""
from flask import request, jsonify, send_file
import tempfile
import json
import pytz
from config import scan_logs, participants

def format_to_ist(dt, fmt="%I:%M %p"):
    """Convert UTC/naive datetime to IST string"""
    if dt.tzinfo is None:
        dt = pytz.UTC.localize(dt)
    return dt.astimezone(pytz.timezone('Asia/Kolkata')).strftime(fmt)

def get_logs():
    """Returns scan logs with user data (Optimized)"""
    day = request.args.get("day", type=int)
    limit = request.args.get("limit", default=100, type=int)

    if not day:
        return jsonify({"error": "day is required"}), 400

    # Use Aggregation to join users and avoid N+1 queries
    pipeline = [
        {"$match": {"day": day}},
        {"$sort": {"scanned_at": -1}},
        {"$limit": limit},
        {
            "$lookup": {
                "from": "participants",
                "localField": "uuid",
                "foreignField": "uuid",
                "as": "user_info"
            }
        },
        {"$unwind": {"path": "$user_info", "preserveNullAndEmptyArrays": True}}
    ]

    records = list(scan_logs.aggregate(pipeline))

    attendance = []
    food = []

    for r in records:
        participant = r.get("user_info", {})
        
        name = participant.get("name", "Unknown") if participant else "Unknown"
        phone = participant.get("phone", "") if participant else ""
        
        # Format time
        dt = r["scanned_at"]
        if dt.tzinfo is None:
            dt = pytz.UTC.localize(dt)
        scanned_time = dt.astimezone(pytz.timezone('Asia/Kolkata')).strftime("%I:%M %p")

        api_item = {
            "uuid": r["uuid"],
            "name": name,
            "phone": phone,
            "time": scanned_time,
            "status": "valid"
        }

        if r["type"] == "attendance":
            attendance.append({
                **api_item,
                "room": r.get("room")
            })
        else:
            food.append({
                **api_item,
                "slot": r["type"]
            })

    return jsonify({
        "day": day,
        "attendance": attendance,
        "food": food
    }), 200


def download_logs():
    """Downloads all scan logs as JSON file"""
    # Fetch all logs
    records = list(scan_logs.find({}).sort("scanned_at", -1))
    
    export_data = []
    for r in records:
        participant = participants.find_one({"uuid": r["uuid"]})
        name = participant.get("name", "Unknown") if participant else "Unknown"
        email = participant.get("email", "") if participant else ""
        phone = participant.get("phone", "") if participant else ""
        
        scanned_time = format_to_ist(r["scanned_at"], "%Y-%m-%d %I:%M %p")
        
        entry = {
            "Name": name,
            "Email": email,
            "Phone": phone,
            "Type": r["type"],
            "Day": r.get("day"),
            "Time": scanned_time,
            "Description": r.get("room") if r["type"] == "attendance" else r.get("type")
        }
        export_data.append(entry)
    
    # Send as JSON (or CSV if preferred, but code was JSON)
    # User said "skip mail part", nothing about file format change.
    # I'll stick to JSON but structure it nicely.
    
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json", mode='w')
    json.dump(export_data, temp_file, indent=2)
    temp_file.close()

    return send_file(
        temp_file.name,
        as_attachment=True,
        download_name="Event_Logs.json",
        mimetype="application/json"
    )
