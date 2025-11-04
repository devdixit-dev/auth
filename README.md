# 🚀 Authentication API (Express + TypeScript + Render)

A high-performance REST API built using **Express.js**, **TypeScript**, and **Zod** for input validation.  
Deployed on **Vercel** with a focus on scalability, speed, and clean architecture.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Validation | Zod |
| Database | MongoDB / Mongoose |
| Logging | Console-based with structured |
| Future Add-ons | Redis (for OTPs, caching), Rate Limiting, Query Optimization |

---

## 🚦 API Endpoints

| Endpoint | Method | Description | Avg Response Time |
|-----------|---------|-------------|-------------------|
| `/` | GET | Health check | **10 ms** |
| `/api/register` | POST | Create new user | **335 ms** |
| `/api/login` | POST | Authenticate user | **325 ms** |
| `/api/logout` | POST | Clear session | **40 ms** |
| `/api/verify` | POST | Verify user via OTP | **70 ms** |
| `/api/me` | GET | Get logged-in user details | **35 ms** |
| `/api/update/me` | PATCH | Update user profile | **60 ms** |
| `/api/remove/me` | DELETE | Delete account | **10 ms** |

> All routes follow **RESTful standards** and use **Zod** for validation.

---

## 🧠 Architecture Overview

- **Layered Design:** Controllers, Routes, Schemas, and Middleware separation for maintainability.
- **Validation-First:** Every incoming request is validated before reaching business logic.
- **Token-Based Auth:** Stateless JWT system compatible with serverless deployment.
- **Serverless Optimized:** Cold start friendly — lightweight dependency footprint.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 📉 Current Performance (Cold Start Included)

| Endpoint  | Response Time |
| --------- | ------------- |
| Home      | 10 ms         |
| Register  | 335 ms        |
| Login     | 325 ms        |
| Logout    | 40 ms         |
| Verify    | 70 ms         |
| Me        | 35 ms         |
| Update/me | 60 ms         |
| Remove/me | 10 ms         |

## 📈 Planned Enhancements

| Feature                     | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| 🧊 **Redis for OTP**        | Store temporary OTPs and session states securely       |
| 🚫 **Rate Limiting**        | Prevent brute-force attacks on login/register/verify   |
| ⚡ **DB Query Optimization** | Reduce latency and improve MongoDB query efficiency    |
| 📊 **Monitoring & Metrics** | Add request tracing and endpoint latency visualization |

# Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run app.ts
```