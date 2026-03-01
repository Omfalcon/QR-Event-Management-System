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
                "subject": "IYRC 2026 – Your Official Registration QR Code",
                "body": {
                    "contentType": "HTML",
                    "content": f"""
        <p>Dear Participant,</p>

        <p>Warm greetings from UPES R&amp;D and CIDRI!</p>

        <p>
        We are delighted to welcome you to the 4th International Young Researchers’ Conclave (IYRC 2026), 
        scheduled from 26–28 February 2026 at UPES, Dehradun. Your participation adds real value to this platform 
        that brings together young researchers, faculty, industry professionals, and policy stakeholders to discuss 
        innovation, translational research, and interdisciplinary collaboration.
        </p>

        <p>
        IYRC is not just a conference. It is an exhibition of active research, a networking forum, 
        and a space where ideas move closer to implementation. We look forward to your engagement 
        across sessions, discussions, and interactions during the conclave.
        </p>

        <p><b>Download Registration QR Code</b></p>

        <p>
        Attached in this email is your unique QR code, which will serve as your official 
        registration ID for IYRC 2026.
        </p>

        <p>This QR code will be used for:</p>
        <ul>
        <li>On-site registration</li>
        <li>Session attendance marking</li>
        <li>Food access</li>
        <li>ID card validation</li>
        <li>Entry verification at designated areas</li>
        </ul>

        <p><b>Important Conference Resources</b></p>

        <p>Please find below the key documents for your reference:</p>
        <ul>
        <li>Abstracts Book</li>
        <li>R&amp;D Newsletter</li>
        <li>Detailed Program Schedule (Day-wise)</li>
        </ul>

        <p>
        <a href="https://drive.google.com/drive/folders/1hOFFMYmct1Ql8qPk3PXXyGuNF7vzgyRv?usp=sharing">
        Click here to access conference documents
        </a>
        </p>

        <p><b>You may download the files and save on your phone/laptop for easy access.</b></p>

        <p>For immediate help you may contact Volunteers who will be available.</p>

        <p><b>Standard Operating Procedure (SOP) – Paperless Conference Initiative</b></p>

        <p>
        IYRC 2026 is being conducted as a fully paperless event, aligned with UPES’ sustainability 
        and digital efficiency goals.
        </p>

        <p>Here is what you need to do:</p>
        <ul>
        <li>Keep your QR code accessible on your mobile device at all times.</li>
        <li>You may keep a printed copy as backup, though it is not mandatory.</li>
        <li>Present your QR code at registration counters and session venues.</li>
        <li>Our volunteers will scan the code at relevant checkpoints.</li>
        <li>No manual signatures, paper coupons, or physical attendance sheets will be used.</li>
        <li>This system ensures faster processing, accurate attendance records, and minimal waiting time.</li>
        </ul>

        <p>
        We request your full cooperation in supporting this initiative and helping us execute a smooth, 
        environmentally responsible conference.
        </p>

        <p>
        If you require any clarification prior to the event, please feel free to write to us at:<br>
        <a href="mailto:researchconclave@ddn.upes.ac.in">researchconclave@ddn.upes.ac.in</a>
        </p>

        <p>
        We look forward to welcoming you personally at UPES and making IYRC 2026 
        a meaningful and memorable experience.
        </p>

        <p>
        Warm regards,<br>
        Organizing Committee<br>
        IYRC 2026<br>
        UPES R&amp;D &amp; CIDRI<br>
        UPES, Dehradun
        </p>
        """
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
