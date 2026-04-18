# 🚀 Flask Backend Deployment (EC2 + Gunicorn + Nginx + HTTPS)

This guide walks through deploying a Flask backend on AWS EC2 using **Gunicorn**, **Nginx**, and **HTTPS (Certbot)**.

---

# 📦 Step 1: Upload & Setup Backend

## 🔹 Upload project

```bash
scp -i C:\Users\hp\Downloads\ieee_quiz.pem backend.rar ubuntu@135.235.195.46:/home/ubuntu
```

## 🔹 Extract files

```bash
sudo apt update
sudo apt install unrar -y
unrar x backend.rar
```

---

## 🔹 Setup Python virtual environment

```bash
sudo apt install python3-venv -y
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🔹 Install & test Gunicorn

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 app:app
```

👉 Test:

```
http://your-ec2-ip:5000
```

---

# 🔧 Step 2: Setup Systemd Service

```bash
sudo nano /etc/systemd/system/flaskapp.service
```

### Service File

```ini
[Unit]
Description=Flask App
After=network.target

[Service]
User=falcon
Group=www-data
WorkingDirectory=/home/falcon/backend
Environment="PATH=/home/falcon/backend/venv/bin"

ExecStart=/home/falcon/backend/venv/bin/gunicorn \
    --workers 3 \
    --bind 127.0.0.1:5000 \
    app:app

[Install]
WantedBy=multi-user.target
```

---

## 🔹 Start service

```bash
sudo systemctl daemon-reload
sudo systemctl start flaskapp
sudo systemctl enable flaskapp
```

---

# ⚙️ Step 3: Setup Nginx (Port 80)

## 🔹 Install Nginx

```bash
sudo apt install nginx -y
```

## 🔹 Create config

```bash
sudo nano /etc/nginx/sites-available/flaskapp
```

### Nginx Config (HTTP)

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:5000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔹 Enable config

```bash
sudo ln -s /etc/nginx/sites-available/flaskapp /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

## 🔹 Remove default config

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

# 🧠 Worker Rule

```
workers = (2 × CPU cores) + 1
```

---

# 🔐 Step 4: Enable HTTPS (Port 443)

## 🔹 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

## 🔹 Update Nginx config

```bash
sudo nano /etc/nginx/sites-available/flaskapp
```

Add your domain:

```nginx
server_name confrence.bhook.food;
```

---

## 🔹 Install SSL

```bash
sudo certbot --nginx -d confrence.bhook.food
```

👉 Choose:

```
Redirect HTTP → HTTPS → YES
```

---

# 🎉 Final Result

Your backend is now live at:

```
https://confrence.bhook.food
```

---

# ⚠️ Important Notes

* Ensure domain DNS → EC2 IP (A record)
* Open ports in EC2:

  * 80 (HTTP)
  * 443 (HTTPS)
* Gunicorn must be running before Nginx

---

# 🧪 Debug Commands

```bash
sudo systemctl status flaskapp
journalctl -u flaskapp -f
sudo nginx -t
```

---

# 🧠 Architecture

```
Client (HTTPS)
      ↓
Nginx (80/443)
      ↓
Gunicorn (127.0.0.1:5000)
      ↓
Flask App
```

---

# 🔥 Done ✅
