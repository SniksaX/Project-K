Rate-Limited Authentication API
Overview
This project is a secure authentication API built with Node.js, Express, and TypeScript, incorporating rate limiting to prevent abuse. It supports user registration, JWT-based authentication, and IP-based request tracking to control excessive API usage.

Features
User Registration & Authentication – Secure JWT-based authentication
Rate Limiting – Limits requests per IP to prevent spam and abuse
Bcrypt Password Hashing – Ensures password security
Middleware for Protected Routes – Restricts access to authenticated users
In-Memory User & IP Storage – Can be extended to Redis or a database
TypeScript for Scalability – Well-structured and maintainable
Installation & Setup
Clone the repository

sh
Copy
Edit
git clone git@github.com:SniksaX/Project-K.git  
cd Project-K  
Install dependencies

sh
Copy
Edit
npm install  
Run the server

sh
Copy
Edit
npm run dev  
The server will be available at: http://localhost:3000

API Endpoints
User Authentication
Supports JWT-based authentication
Limits login attempts per IP (e.g., max 5 per minute)
Tech Stack
Node.js & Express – Backend framework
TypeScript – Ensures type safety and maintainability
JWT (jsonwebtoken) – Authentication token system
Bcrypt – Secure password hashing
Rate Limiting Logic – IP-based tracking and request control
Future Improvements
Redis Integration – Persistent rate limiting
Database Storage – User management with MongoDB or PostgreSQL
Advanced Ban System – IP blocking for repeated offenses
Role-Based Access Control (RBAC) – Granular access management
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository
Create a new branch: feature/your-feature-name
Make your changes and commit
Push to your branch and open a pull request
License
This project is licensed under the MIT License.
