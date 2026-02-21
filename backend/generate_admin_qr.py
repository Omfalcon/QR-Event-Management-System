#!/usr/bin/env python3
"""
generate_admin_qr.py — Generates admin_qr.png from .env credentials.
Requirements: pip install qrcode[pil] python-dotenv
Usage: python generate_admin_qr.py
"""

import json
import os
import qrcode
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

ADMIN_UUID = os.getenv("ADMIN_UUID", "a1b2c3d4-e5f6-4789-abcd-ef0123456789")
ADMIN_PASS = os.getenv("ADMIN_PASS", "iyrc-admin-2026")

payload = json.dumps({"uuid": ADMIN_UUID, "adminpass": ADMIN_PASS}, separators=(",", ":"))

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=4,
)
qr.add_data(payload)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("admin_qr.png")
print("✅  PNG saved → admin_qr.png")
