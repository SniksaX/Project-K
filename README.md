🚀 Rate-Limited Authentication API

📌 Overview

This project is a secure authentication API built with Node.js, Express, and TypeScript, featuring rate limiting to prevent abuse. It includes user registration, login with JWT authentication, and IP-based request tracking to control excessive API usage.

⚡ Features

✅ User Registration & Authentication (JWT-based)✅ Rate Limiting – Limits requests per IP to prevent spam✅ Bcrypt Password Hashing for security✅ Middleware for Protected Routes✅ In-Memory User & IP Storage (Can be extended to Redis/DB)✅ Well-structured TypeScript project for scalability

🏗️ Installation & Setup

1️⃣ Clone the Repository

git clone git@github.com:SniksaX/Project-K.git
cd Project-K

2️⃣ Install Dependencies

npm install

3️⃣ Run the Server

npm run dev

📌 Server will run on: http://localhost:3000

🔑 API Endpoints

📝 User Authentication

Limits requests per IP (e.g., max 5 per minute)

🛠️ Tech Stack

Node.js + Express 🚀 (Backend Framework)

TypeScript ⌨️ (Strong Typing & Maintainability)

JWT (jsonwebtoken) 🔐 (Authentication Token System)

Bcrypt 🛡️ (Password Hashing)

Rate Limiting Logic 🛠️ (IP Tracking)

🏗️ Future Improvements

✅ Redis Integration for persistent rate limiting✅ Database Storage for users (MongoDB/PostgreSQL)✅ Advanced Ban System (e.g., block IPs after multiple offenses)✅ Role-Based Access Control (RBAC)

🤝 Contributing

Fork the repo 🍴

Create a new branch: feature/new-feature

Commit your changes ✏️

Push & Open a Pull Request ✅

📜 License

This project is licensed under the MIT License.

🚀 Let's build something great! 😎🔥

