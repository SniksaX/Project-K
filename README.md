# Project-K Authentication API

## Overview

Project-K is a secure authentication API built with Node.js, Express, and TypeScript. It provides user registration, email verification, login, protected routes, and security middleware.

## Features

- **User Registration** with email verification
- **User Authentication** using JWT tokens
- **Rate Limiting** to prevent abuse
- **Request Logging** for tracking API usage
- **Error Handling** for structured responses
- **Email Service** for verification emails

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A valid Gmail account for email verification

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/SniksaX/Project-K_Authentication-API
   cd Project-K_Authentication-API
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   PORT=3000
   SECURITY_TOKEN=your_secret_key
   EMAIL_PASS_GMAIL=your_gmail_address
   PASS_WORD=your_gmail_password
   ```

4. Activate Gmail App Password:

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable **2-Step Verification** if not already enabled.
   - Scroll down to **App Passwords** and generate a password.
   - Use this generated password as `PASS_WORD` in your `.env` file.

5. Start the server:

   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/auth/register`     | Register a new user                |
| POST   | `/auth/login`        | Authenticate a user                |
| GET    | `/auth/protected`    | Access a protected route (JWT req) |
| GET    | `/auth/verify-email` | Verify email with a token          |

### Request Format

#### Registration

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Response (Success)

```json
{
  "message": "Connected",
  "token": "your_jwt_token",
  "user": {
    "id": "user_id",
    "username": "john_doe"
  }
}
```

## Middleware

- **JWT Authentication (`verifyJWT`)**: Protects routes by verifying tokens.
- **Rate Limiting (`RateLimiter`)**: Limits requests per IP to prevent abuse.
- **Request Tracking (`RequestTracker`)**: Logs incoming requests.
- **Error Handling (`errorHandler`)**: Manages API errors.

## Development

### Running in Development Mode

```sh
npm run dev
```

### Running in Production Mode

```sh
npm start
```

## Project Structure

```
Project-K_Authentication-API/
│── src/
│   ├── config/
│   │   └── env.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── limiter.middleware.ts
│   │   ├── tracker.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   └── type.requests.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── services/
│   │   └── email.service.ts
│── logs/
│── main.ts
│── package.json
│── README.md
```

## License

This project is licensed under the MIT License.

## Contact

For inquiries, contact: [siraj.rahal.dev@gmail.com](mailto:siraj.rahal.dev@gmail.com)
