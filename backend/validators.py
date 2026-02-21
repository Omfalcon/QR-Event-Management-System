"""Input validation functions"""
import re
from typing import Optional


VALID_DAYS = {1, 2, 3}
VALID_TYPES = {"attendance", "morning-tea", "lunch", "afternoon-tea"}
VALID_ROOMS = {"Mac", "Room 1005", "Room 1006", "Trust Room", "AB1", "BUZZ"}
VALID_SLOTS = {"morning-tea", "lunch", "afternoon-tea"}


def is_valid_uuid(uuid: str) -> bool:
    """Validate UUID v4 format"""
    if not isinstance(uuid, str):
        return False
    
    pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    return bool(re.match(pattern, uuid, re.IGNORECASE))


def is_valid_day(day) -> bool:
    """Validate day is 1, 2, or 3"""
    try:
        day_int = int(day)
        return day_int in VALID_DAYS
    except (ValueError, TypeError):
        return False


def is_valid_type(scan_type: str) -> bool:
    """Validate scan type is in whitelist"""
    return isinstance(scan_type, str) and scan_type in VALID_TYPES


def is_valid_room(room: Optional[str]) -> bool:
    """Validate room is in whitelist"""
    if room is None:
        return True
    return isinstance(room, str) and room in VALID_ROOMS


def is_valid_slot(slot: Optional[str]) -> bool:
    """Validate slot is in whitelist"""
    if slot is None:
        return True
    return isinstance(slot, str) and slot in VALID_SLOTS


def is_valid_email(email: str) -> bool:
    """Validate email format"""
    if not isinstance(email, str):
        return False
    
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def is_valid_password(password: str) -> bool:
    """Validate password strength (min 8 chars)"""
    return isinstance(password, str) and len(password) >= 8
