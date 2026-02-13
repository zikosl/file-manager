# 🚀 Uploady

> A modern file management and collaboration platform built with Laravel & React.
> Create spaces, manage files, share securely, and collaborate efficiently.

---

## 🌍 Overview

**Uploady** is a SaaS-ready file storage and collaboration platform inspired by Google Drive.
It allows teams and individuals to create isolated workspaces (“Spaces”), upload and manage files, invite members, and control access permissions.

Built for scalability, modularity, and clean architecture.

---

## ✨ Core Features

### 🔐 Authentication & Security

* User registration & login
* Secure password hashing
* Role-based access control
* Space-level permissions

### 📁 Spaces (Workspaces)

* Create multiple spaces
* Invite users to spaces
* Manage user roles per space

### 📤 File Management

* Upload files
* Delete & organize files
* Access control per space
* Secure file storage

### 👥 Collaboration

* Share spaces with other users
* Manage user permissions
* Controlled file visibility

### 🐳 DevOps Ready

* Fully Dockerized
* Nginx + PHP configuration
* MySQL service
* Ready for cloud deployment

---

# 🏗 Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Backend    | Laravel (PHP)           |
| Frontend   | React                   |
| Database   | MySQL                   |
| Web Server | Nginx                   |
| DevOps     | Docker & Docker Compose |

---

# 📸 Screenshots

> Replace these with real screenshots once deployed.

### 🔐 Login Page

```
/screenshots/login.png
```

### 📁 Dashboard

```
/screenshots/dashboard.png
```

### 📂 Space View

```
/screenshots/space.png
```

### 📤 File Upload

```
/screenshots/upload.png
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/uploady.git
cd uploady
```

---

## 2️⃣ Environment Setup

Remove placeholder files:

```bash
rm src/empty
rm mysql/empty
```

Update database credentials in `docker-compose.yml`:

```yaml
MYSQL_DATABASE: laraveldb
MYSQL_USER: laravel
MYSQL_PASSWORD: secret
MYSQL_ROOT_PASSWORD: secret
```

---

## 3️⃣ Build Containers

```bash
docker compose build
```

---

## 4️⃣ Start Containers

```bash
docker compose up -d
```

Open in browser:

```
http://localhost/login
```

---

## 5️⃣ Configure Laravel

Edit:

```
src/.env
```

Update DB configuration:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laraveldb
DB_USERNAME=laravel
DB_PASSWORD=secret
```

Restart containers:

```bash
docker compose down
docker compose up -d
```

---

## 6️⃣ Run Migrations

```bash
docker compose run --rm php artisan migrate
```

---

## 7️⃣ Start React Dev Server

```bash
docker compose run --rm --service-ports npm run dev
```

---

# 🔌 API Documentation

## 🔐 Authentication

### Login

```
POST /api/login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

## 📁 Spaces

### Create Space

```
POST /api/spaces
```

### Get User Spaces

```
GET /api/spaces
```

---

## 📤 Files

### Upload File

```
POST /api/files
```

Form Data:

```
file: <file>
space_id: <id>
```

### Get Files in Space

```
GET /api/spaces/{id}/files
```

---

## 👥 Users

### Invite User to Space

```
POST /api/spaces/{id}/users
```

---

# 🧪 Useful Commands

### Enter PHP container

```bash
docker compose run --rm php sh
```

### Fix permission issues

```bash
chown -R laravel:laravel /var/www/html
```

---

# 🚀 Deployment (Production Tips)

* Set `APP_ENV=production`
* Set `APP_DEBUG=false`
* Use HTTPS
* Configure cloud storage (S3 recommended)
* Set up queue workers for file processing
* Use Laravel Sanctum or JWT for API authentication

---

# 📈 Future Improvements

* Folder system
* File versioning
* Activity logs
* Drag & drop upload
* Storage quota per space
* Public shareable links
* Subscription plans (SaaS monetization)

---

# 🤝 Contributing

Contributions are welcome!

### Steps:

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes

   ```bash
   git commit -m "Add new feature"
   ```
4. Push branch

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

---

# 🧠 Architecture Overview

* RESTful API (Laravel)
* React SPA frontend
* Dockerized services
* MVC backend structure
* Role-based permission handling

---

# 📄 License

MIT License.


