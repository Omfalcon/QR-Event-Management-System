from config import keynotes
from bson import ObjectId

def get_all_keynotes():
    """
    Returns the entire schedule, organized by day -> room.
    """
    # Exclude _id from the result to keep it clean JSON
    data = list(keynotes.find({}, {"_id": 0}))
    
    # Transform list into nested dictionary for frontend (Day -> Room)
    schedule = {}
    for item in data:
        day = item.get("day")
        room = item.get("room")
        if day and room:
            if day not in schedule:
                schedule[day] = {"title": f"Day {day}", "rooms": {}}
            
            schedule[day]["rooms"][room] = item
            
    return schedule

def update_keynote(day, room, data):
    """
    Updates a specific room's schedule for a specific day.
    """
    try:
        day = int(day)
        room = int(room)
    except ValueError:
        return {"error": "Day and Room must be integers"}, 400

    # Ensure day and room are set in the data
    data["day"] = day
    data["room"] = room

    result = keynotes.replace_one(
        {"day": day, "room": room},
        data,
        upsert=True
    )
    
    return {"message": "Schedule updated successfully", "modified": result.modified_count}, 200

def seed_keynotes_db(data):
    """
    Seeds the database with initial data.
    """
    # clear existing
    keynotes.delete_many({})
    
    # Flatten the nested structure for storage
    to_insert = []
    
    for day_id, day_data in data.items():
        for room_id, room_data in day_data["rooms"].items():
            # Create a document for each room
            doc = room_data.copy()
            doc["day"] = int(day_id)
            doc["room"] = int(room_id)
            to_insert.append(doc)
            
    if to_insert:
        keynotes.insert_many(to_insert)
        print(f"✅ Seeded {len(to_insert)} sessions.")
    else:
        print("⚠️ No data to seed.")
