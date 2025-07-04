# 🏗️ Project Architecture Overview — B2B Tenders Platform

This document describes the high-level architecture, API design, authentication flow, and storage integration of the B2B Tender Management System.

---

## 📂 Project Structure

- **Frontend:**  
  Built using **Next.js** and **Tailwind CSS**  
  Deployed on **Vercel**

- **Backend:**  
  Built using **Node.js (Express.js)** with **Knex.js** for database access  
  Deployed on **Render**

- **Database:**  
  PostgreSQL database hosted on **Render PostgreSQL**

- **Storage:**  
  Supabase is used for storing uploaded files (if applicable).

---

## ⚙️ Components Overview

### 1. Frontend (Next.js)
- Handles user interface and user interaction:
  - Company Registration/Login
  - Browsing Companies & Tenders
  - Tender Application Submission
  - Dashboard to manage company profile & applications
- Communicates with backend using **Axios** API requests.

---

### 2. Backend (Node.js + Express + Knex.js)
- Provides RESTful APIs for:
  - User Authentication
  - Tender Management
  - Company Information
  - Application Management
- Uses Knex for PostgreSQL queries and migrations.
- Includes JWT-based authentication middleware.

---

### 3. Database (PostgreSQL)
- PostgreSQL database hosted on **Render**.
- Stores:
  - User accounts
  - Company profiles (including logo image URLs from Supabase)
  - Tender details
  - Applications to tenders
- Managed via **Knex.js migrations**.

---

### 4. Supabase Storage Integration
- Supabase is integrated **for uploading company profile images**.
- When a company uploads a profile image:
  - The image is stored in **Supabase Bucket Storage**.
  - The **public URL** of the uploaded image is stored in the PostgreSQL database.
- Files are uploaded from the backend using Supabase API with `SUPABASE_URL` and `SUPABASE_KEY` from environment variables.


---

## 🔒 Authentication Flow (JWT-based)

1. **Registration/Login:**  
   Users register/login via API → receive JWT token.

2. **JWT Token:**  
   JWT token is stored on the frontend and included in API requests.

3. **Protected Routes:**  
   Backend verifies JWT token on protected API routes using middleware.

---

## 🔗 API Design

| Endpoint                                     | Method | Description                                           |
|----------------------------------------------|--------|-------------------------------------------------------|
| `/auth/register`                             | POST   | Company Registration                                  |
| `/auth/login`                                | POST   | Company Login                                         |
| `/companies`                                 | GET    | List All Companies                                    |
| `/companies`                                 | POST   | Create New Company                                    |
| `/companies/:companyId`                      | GET    | Get Specific Company Details                          |
| `/companies/:companyId`                      | PUT    | Update Company Details                                |
| `/tenders`                                   | GET    | List All Available Tenders                            |
| `/tenders`                                   | POST   | Create New Tender                                     |
| `/tenders/:tenderId`                         | GET    | Get Specific Tender Details                           |
| `/tenders/:tenderId`                         | DELETE | Delete Specific Tender                                |
| `/tenders/company/:companyId`                | GET    | Get All Tenders Posted by a Specific Company          |
| `/apply`                                     | POST   | Submit Application for a Tender                       |
| `/apply/:tenderId`                           | GET    | View All Applications for a Specific Tender           |
| `/search?name=<companyName>`                 | GET    | Search Companies by Name                              |
| `/search?industry=<industryName>`            | GET    | Search Companies by Industry                          |
| `/search`                                    | GET    | Get All Companies (Search All with No Filters)        |
| `/upload/logo`                               | POST   | Upload Company Logo/Profile Image to Supabase Storage |


- All protected actions, including company-related and tender-related operations, require authentication via a valid JWT token.


---

## ⚙️ Storage Integration (Supabase)

- Supabase is used specifically for uploading and storing **company profile images** (logos).
- When a company uploads its logo:
  - The image is stored in a **Supabase Storage Bucket**.
  - A **public URL** for the image is generated and saved in the PostgreSQL database.
- The backend handles Supabase integration via `SUPABASE_URL` and `SUPABASE_KEY` from environment variables.

## 🗄️ Database Integration (PostgreSQL)

- The backend connects to a **PostgreSQL** database hosted on **Render PostgreSQL**.
- Database queries and migrations are handled using **Knex.js**.
- PostgreSQL stores:
  - Company profiles and their metadata
  - Tender details
  - Tender applications
  - Supabase logo URLs
- Database credentials are securely loaded from environment variables (`DATABASE_URL`).

---

## ✅ Key Technologies
- **Next.js** (Frontend)
- **Express.js + Node.js** (Backend)
- **Knex.js + PostgreSQL** (Database)
- **Supabase** (Storage)
- **JWT** (Authentication)

---

## 📝 Summary

This architecture ensures a scalable, modular, and secure platform for B2B Tender Management with clear separation of concerns between frontend, backend, database, and storage components.
