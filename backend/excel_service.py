import pandas as pd
import os
import uuid
import io
import qrcode
from PIL import Image, ImageDraw, ImageFont
from config import participants
from mail_service import send_mail_with_qr



def process_excel_upload_stream(file_path):
    """
    Generator that parses Excel and yields progress updates (SSE format).
    """
    try:
        df = pd.read_excel(file_path)
    except Exception as e:
        yield f"data: {{\"error\": \"Failed to read Excel: {str(e)}\"}}\n\n"
        return

    # Normalize column names
    df.columns = [str(c).strip() for c in df.columns]
    
    col_map = {}
    for c in df.columns:
        cl = c.lower()
        if "email" in cl:
            col_map["email"] = c
        elif "name" in cl and "company" not in cl:
            col_map["name"] = c
        elif "phone" in cl or "contact" in cl:
            col_map["phone"] = c

    if "email" not in col_map or "name" not in col_map:
        yield f"data: {{\"error\": \"Missing columns. Need 'Email Address' and 'Name'.\"}}\n\n"
        return

    total_rows = len(df)
    processed = 0
    emails_sent = 0
    errors = []

    # Initial Stats
    yield f"data: {{\"status\": \"start\", \"total\": {total_rows}}}\n\n"

    for index, row in df.iterrows():
        processed += 1
        try:
            name = str(row.get(col_map["name"], "")).strip()
            email = str(row.get(col_map["email"], "")).strip()
            phone = str(row.get(col_map.get("phone", "Phone Number"), "")).strip()

            if not email or "@" not in email:
                continue
                
            if name.lower() == "nan": name = "Participant"

            # Check existence
            participant = participants.find_one({"email": email})

            if not participant:
                uid = str(uuid.uuid4())
                participant = {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "uuid": uid,
                    "mail_sent": False
                }
                participants.insert_one(participant)
            else:
                uid = participant["uuid"]

            # Generate QR (In-Memory)
            qr = qrcode.QRCode(box_size=10, border=4)
            qr.add_data(uid)
            qr.make(fit=True)
            
            qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')
            try:
                font = ImageFont.truetype("arial.ttf", 40)
            except IOError:
                font = ImageFont.load_default()
                
            text = "IYRC2026"

            dummy_draw = ImageDraw.Draw(qr_img)
            text_bbox = dummy_draw.textbbox((0, 0), text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            # New Image dimensions
            new_width = qr_img.width
            new_height = qr_img.height + text_height + 20 # 20px padding
            
            final_img = Image.new('RGB', (new_width, new_height), 'white')
            draw = ImageDraw.Draw(final_img)
            
            # Paste QR
            final_img.paste(qr_img, (0, text_height + 10))
            
            # Draw Text
            text_x = (new_width - text_width) // 2
            draw.text((text_x, 5), text, fill="black", font=font)
            
            img_buffer = io.BytesIO()
            final_img.save(img_buffer, format="PNG")
            img_bytes = img_buffer.getvalue()

            # Send Email
            if not participant.get("mail_sent"):
                yield f"data: {{\"status\": \"sending\", \"current\": {processed}, \"total\": {total_rows}, \"name\": \"{name}\"}}\n\n"
                
                sent = send_mail_with_qr(email, name, img_bytes)
                
                if sent:
                    participants.update_one({"email": email}, {"$set": {"mail_sent": True}})
                    emails_sent += 1
                else:
                    errors.append(f"Failed: {email}")
            
        except Exception as row_err:
            errors.append(f"Row {index}: {str(row_err)}")

    # Final Summary
    yield f"data: {{\"status\": \"complete\", \"processed\": {processed}, \"emails_sent\": {emails_sent}, \"errors\": {len(errors)}}}\n\n"

def analyze_excel_upload(file_path):
    """
    Analyzes Excel file and returns stats on how many emails are pending.
    Does NOT send emails or modify DB.
    """
    try:
        df = pd.read_excel(file_path)
    except Exception as e:
        return {"error": f"Failed to read Excel: {str(e)}"}

    df.columns = [str(c).strip() for c in df.columns]
    
    col_map = {}
    for c in df.columns:
        cl = c.lower()
        if "email" in cl:
            col_map["email"] = c
        elif "name" in cl and "company" not in cl:
            col_map["name"] = c

    if "email" not in col_map:
        return {"error": "Missing 'Email Address' column."}

    stats = {
        "total": 0,
        "already_sent": 0,
        "pending": 0,
        "new_users": 0
    }

    for _, row in df.iterrows():
        try:
            stats["total"] += 1
            email = str(row.get(col_map["email"], "")).strip()
            
            if not email or "@" not in email:
                continue

            participant = participants.find_one({"email": email})

            if not participant:
                stats["new_users"] += 1
                stats["pending"] += 1 # New users need email
            elif participant.get("mail_sent"):
                stats["already_sent"] += 1
            else:
                stats["pending"] += 1 # Existing user, email not sent

        except:
            pass
            
    return stats


def get_sent_participants():
    """Returns a list of participant dicts where mail_sent is True."""
    # Projection to return only needed fields
    cursor = participants.find(
        {"mail_sent": True},
        {"_id": 0, "name": 1, "email": 1, "phone": 1, "uuid": 1}
    )
    return list(cursor)
