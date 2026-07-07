# IYRC QR & Event Management System

A comprehensive full-stack application designed to manage the International Youth Robot Competition (IYRC) event. The system provides tools for participant management, QR code generation and scanning, keynote scheduling, email communications, and detailed event logging. It is built with a Python (Flask) backend and a modern React (Vite) frontend with Capacitor integration for cross-platform mobile scanning capabilities.

## 🚀 Features

### **Participant & QR Management**
- **Excel Upload & Processing:** Upload participant lists via Excel, automatically process data, and generate unique IDs.
- **QR Code Generation:** Generate unique QR codes for participants, which are sent directly to their registered email addresses.
- **QR Code Scanning:** Scan participant QR codes during the event (via web scanner or native ML Kit barcode scanning on mobile) to track attendance or access.
- **Manual QR Generation:** Admins can manually generate QR codes for on-the-spot registrations.

### **Event Management**
- **Keynotes & Schedule:** Manage keynote speakers, event schedules, and room allocations. 
- **Speaker Profiles & Themes:** Detailed pages for speakers, event themes, and venue maps.
- **Feedback Collection:** Users can submit feedback, and admins can view feedback statistics.

### **Admin & Security**
- **Role-Based Access Control (RBAC):** Three distinct roles (`superadmin`, `manager`, `user`) with tailored permissions.
- **Dashboard & Logs:** Detailed dashboards for Admins and Managers to track scan counts, download logs, and monitor system activity.
- **Manager Management:** Superadmins can create, update, and remove manager accounts.
- **Microsoft Authentication:** Secure integration with Microsoft Authentication for robust email sending via Microsoft Graph/SMTP.

## 🛠️ Technology Stack

### **Backend (Python / Flask)**
- **Framework:** Flask (REST API)
- **Database:** MongoDB (using `pymongo`) with unique indexing for robust data integrity.
- **Authentication:** JWT (`pyjwt`), Bcrypt (`bcrypt`) for password hashing.
- **Data Processing:** `pandas`, `openpyxl` for Excel parsing.
- **Utilities:** `qrcode`, `pillow` for generating QR code images.

### **Frontend (React / Vite)**
- **Framework:** React 19 + Vite for ultra-fast development and build times.
- **Styling:** Tailwind CSS for responsive, modern UI design.
- **QR Scanning:** 
  - `@capacitor-mlkit/barcode-scanning` (Native mobile barcode scanning via Capacitor)
  - `html5-qrcode` (Web fallback)
- **Mobile Integration:** Capacitor (`@capacitor/core`, `@capacitor/android`, `@capacitor/ios`) to package the web app as native Android and iOS applications.
- **Routing:** React Router v7 (`react-router-dom`).

## 📁 Project Structure

```
iyrcqr/
│
├── backend/                  # Flask REST API Backend
│   ├── app.py                # Main application entry point
│   ├── config.py             # Environment variables and MongoDB configuration
│   ├── auth_middleware.py    # JWT authentication middleware
│   ├── *_service.py          # Modular business logic (auth, excel, feedback, mail, etc.)
│   └── requirements.txt      # Python dependencies
│
└── frontend-react/           # React Frontend Application
    ├── src/                  # Source code
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Application views (Dashboards, Scan, Schedule, etc.)
    │   ├── context/          # React Context for global state
    │   └── hooks/            # Custom React hooks
    ├── capacitor.config.json # Capacitor configuration for mobile builds
    ├── package.json          # Node dependencies and scripts
    ├── tailwind.config.cjs   # Tailwind CSS configuration
    └── vite.config.js        # Vite build configuration
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB instance (local or Atlas)
- Microsoft Azure App Registration (for email sending functionality)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI="your_mongodb_connection_string"
   JWT_SECRET_KEY="your_super_secret_jwt_key"
   ADMIN_UUID="superadmin_uuid"
   ADMIN_PASS="superadmin_password"
   # Microsoft Auth keys for Mail Service
   MS_CLIENT_ID="your_ms_client_id"
   MS_CLIENT_SECRET="your_ms_client_secret"
   MS_REDIRECT_URI="http://localhost:5000/callback"
   ```
5. Start the backend server:
   ```bash
   python app.py
   ```
   *The server will run on http://localhost:5000*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend-react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will be available at http://localhost:5173*

### Mobile Build (Capacitor)
To build the application for Android or iOS:
1. Build the web assets:
   ```bash
   npm run build
   ```
2. Sync with Capacitor:
   ```bash
   npx cap sync
   ```
3. Open in Android Studio or Xcode:
   ```bash
   npm run cap:open:android
   # or
   npm run cap:open:ios
   ```

## 🔒 Security & Access

- All API endpoints handling sensitive data or operations are protected by JWT authentication (`@require_auth` decorator in Flask).
- Passwords are securely hashed using bcrypt before being stored in MongoDB.
- Only users with the `superadmin` role can manage other managers or access global event statistics.
