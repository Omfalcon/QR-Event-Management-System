from flask import Flask, request, redirect, jsonify, Response
from flask_cors import CORS
import os
import tempfile

from qr_service import validate_qr
from scan_service import confirm_scan
from logs_service import get_logs, download_logs, get_admin_counts
from auth_service import register_user, login_user, get_current_user, create_manager, get_all_managers, update_manager, delete_manager
from auth_middleware import require_auth
from excel_service import get_sent_participants, analyze_excel_upload, process_excel_upload_stream
from mail_service import get_auth_url, process_callback

app = Flask(__name__)
CORS(app)


@app.route("/api/auth/register", methods=["POST"])
def register_route():
    return register_user(request.get_json())


@app.route("/api/auth/login", methods=["POST"])
def login_route():
    return login_user(request.get_json())


@app.route("/api/auth/me", methods=["GET"])
@require_auth
def current_user_route():
    return get_current_user(request.current_user["username"])


@app.route("/api/admin/managers", methods=["GET"])
@require_auth
def get_managers_route():
    return get_all_managers()


@app.route("/api/admin/managers", methods=["POST"])
@require_auth
def create_manager_route():
    # Local imports removed
    return create_manager(request.get_json(), request.current_user)


@app.route("/api/admin/managers/<id>", methods=["PUT"])
@require_auth
def update_manager_route(id):
    return update_manager(id, request.get_json())


@app.route("/api/admin/managers/<id>", methods=["DELETE"])
@require_auth
def delete_manager_route(id):
    return delete_manager(id)


@app.route("/api/qr/validate", methods=["POST"])
@require_auth
def validate_qr_route():
    return validate_qr(request.get_json())


@app.route("/api/scan/confirm", methods=["POST"])
@require_auth
def confirm_scan_route():
    return confirm_scan(request.get_json())


@app.route("/api/logs", methods=["GET"])
@require_auth
def logs_route():
    return get_logs()


@app.route("/api/logs/download", methods=["GET"])
@require_auth
def download_logs_route():
    return download_logs()


@app.route("/api/admin-counts", methods=["GET"])
@require_auth
def admin_counts_route():
    return get_admin_counts()


# --- MS Auth Routes ---
@app.route("/auth/microsoft")
def ms_auth():
    return redirect(get_auth_url())

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if code:
        if process_callback(code):
             return "✅ Authentication successful! You can close this window and proceed with uploads."
        return "❌ Authentication failed."
    return "Missing code."

# --- Excel Upload ---
@app.route("/api/upload/stream", methods=["POST"])
@require_auth
def upload_file_stream():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save to a unique temp file
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")
    file.save(temp.name)
    temp.close()

    # Local imports removed

    def generate():
        try:
            yield from process_excel_upload_stream(temp.name)
        finally:
             if os.path.exists(temp.name):
                os.unlink(temp.name)

    return Response(generate(), mimetype='text/event-stream')

@app.route("/api/upload/analyze", methods=["POST"])
@require_auth
def analyze_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    
    # Save to a unique temp file
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx")
    file.save(temp.name)
    temp.close()

    try:
        
        result = analyze_excel_upload(temp.name)
        return jsonify(result), 200
    finally:
        if os.path.exists(temp.name):
            os.unlink(temp.name)

@app.route("/api/participants/sent", methods=["GET"])
@require_auth
def get_sent_participants_route():
    try:
        data = get_sent_participants()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Keynotes API ---
from keynotes_service import get_all_keynotes, update_keynote

@app.route("/api/keynotes", methods=["GET"])
def get_keynotes_route():
    return jsonify(get_all_keynotes()), 200

@app.route("/api/keynotes/<day>/<room>", methods=["PUT"])
@require_auth
def update_keynote_route(day, room):
    # Allowed roles: superadmin, manager
    user_role = request.current_user.get("role")
    if user_role not in ["superadmin", "manager"]:
        return jsonify({"error": "Unauthorized"}), 403
        
    return update_keynote(day, room, request.get_json())


# --- Feedback API ---
from feedback_service import save_feedback, get_all_feedback

@app.route("/api/feedback", methods=["POST"])
def submit_feedback_route():
    return save_feedback(request.get_json())

@app.route("/api/feedback", methods=["GET"])
@require_auth
def get_feedback_route():
    # Allowed roles: superadmin
    user_role = request.current_user.get("role")
    if user_role != "superadmin":
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify(get_all_feedback()), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
