import json
import time
import requests
import os
from base64 import b64encode
# Load from env
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
TENANT_ID = os.getenv("TENANT_ID")
TOKEN_URL = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"

def get_valid_token():
    """Get a valid access token, refreshing if necessary (Custom Implementation)."""
    token_path = "token.json"
    
    if not os.path.exists(token_path):
        print("⚠️ token.json not found. Please authenticate manually first.")
        return None

    try:
        with open(token_path) as f:
            token = json.load(f)
    except json.JSONDecodeError:
        print("⚠️ token.json is corrupt.")
        return None

    # Check expiration (with 10s buffer)
    if time.time() > (token.get("expires_at", 0) - 10):
        print("🔄 Refreshing Microsoft Graph Token...")
        try:
            r = requests.post(TOKEN_URL, data={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "grant_type": "refresh_token",
                "refresh_token": token["refresh_token"],
                "scope": "offline_access Files.ReadWrite Mail.Send User.Read"
            })
            
            if r.status_code != 200:
                print(f"❌ Token Refresh Failed: {r.text}")
                return None
                
            new_data = r.json()

            token = {
                "access_token": new_data["access_token"],
                "refresh_token": new_data.get("refresh_token", token["refresh_token"]),
                "expires_at": time.time() + new_data["expires_in"]
            }

            with open(token_path, "w") as f:
                json.dump(token, f)
                
        except Exception as e:
            print(f"❌ Token Refresh Exception: {e}")
            return None

    return token["access_token"]


def get_auth_url():
    """Returns URL to manually get the INITIAL code/token (for developers)."""
    # Simple URL construction for manual use if needed
    scope = "offline_access Files.ReadWrite Mail.Send User.Read"
    return f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={os.getenv('REDIRECT_URI')}&response_mode=query&scope={scope}"


def process_callback(code):
    """Exchanges initial code for token and creates token.json."""
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "scope": "offline_access Files.ReadWrite Mail.Send User.Read"
    }
    
    try:
        r = requests.post(TOKEN_URL, data=data)
        if r.status_code == 200:
            res = r.json()
            token = {
                "access_token": res["access_token"],
                "refresh_token": res["refresh_token"],
                "expires_at": time.time() + res["expires_in"]
            }
            with open("token.json", "w") as f:
                json.dump(token, f)
            print("✅ Initial Token Saved to token.json")
            return True
        else:
            print(f"❌ Auth Code Exchange Failed: {r.text}")
            return False
    except Exception as e:
        print(f"❌ Auth Exception: {e}")
        return False

def send_mail_with_qr(to_email, name, qr_content):
    """
    Send an email with QR code.
    :param qr_content: Bytes of the PNG image
    """
    try:
        token = get_valid_token()
        if not token:
            print(f"❌ Failed to send email to {to_email}: No Token")
            return False

        # Encode bytes to base64 string
        qr_encoded = b64encode(qr_content).decode()

        attachments = [
            {
                "@odata.type": "#microsoft.graph.fileAttachment",
                "name": "entry_qr.png",
                "contentType": "image/png",
                "contentBytes": qr_encoded
            }
        ]

        mail = {
            "message": {
                "subject": "Your Event Entry Pass",
                "body": {
                    "contentType": "Text",
                    "content": f"Hi {name},\n\nPlease find your QR Code attached.\n\nSee you at the event!"
                },
                "toRecipients": [{"emailAddress": {"address": to_email}}],
                "attachments": attachments
            },
            "saveToSentItems": True
        }

        r = requests.post(
            "https://graph.microsoft.com/v1.0/me/sendMail",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            json=mail
        )

        if r.status_code == 202:
            print(f"✅ Email sent to {to_email}")
            return True
        else:
            print(f"❌ Microsoft API Error: {r.text}")
            return False
            
    except Exception as e:
        print(f"❌ Email Exception: {e}")
        return False
