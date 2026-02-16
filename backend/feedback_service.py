import json
import os
from datetime import datetime

FEEDBACK_FILE = "feedback.json"

def get_all_feedback():
    """
    Returns all feedback entries.
    """
    if not os.path.exists(FEEDBACK_FILE):
        return []
    
    try:
        with open(FEEDBACK_FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def save_feedback(data):
    """
    Saves a new feedback entry.
    """
    feedback_list = get_all_feedback()
    
    new_entry = {
        "id": len(feedback_list) + 1,
        "rating": data.get("rating"),
        "likedMost": data.get("likedMost", ""),
        "suggestions": data.get("suggestions", ""),
        "timestamp": datetime.now().isoformat()
    }
    
    feedback_list.append(new_entry)
    
    with open(FEEDBACK_FILE, "w") as f:
        json.dump(feedback_list, f, indent=4)
        
    return {"message": "Feedback submitted successfully"}, 201
