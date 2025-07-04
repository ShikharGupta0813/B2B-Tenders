# 🏗️ B2B Tenders — Tender Management System

This is a full-stack web application for tender discovery, submission, and management. Companies can register, submit proposals for tenders, and manage their profiles easily.

## 🚀 Features
- Company Registration & Login (JWT-based)
- Browse & Apply to Available Tenders
- Company Dashboard & Profile Management
- Admin Panel for Tender Management (optional)
- PostgreSQL Database Integration (Knex.js)
- Responsive UI for Desktop & Mobile

---

## 🛠️ Technologies Used
- **Frontend:** Next.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Knex.js
- **Database:** PostgreSQL (Render PostgreSQL)
- **Deployment:** 
  - Frontend → [Vercel](https://vercel.com/)
  - Backend → [Render](https://render.com/)

---

## 🗂️ Folder Structure
Assignment/
│
├── backend/ → Express.js Backend (API)
│ ├── migrations/ → Knex Migrations
│ ├── src/ → API Routes & Controllers
│ ├── knexfile.js → DB Config
│ └── .env → Environment Variables
│
└── my-next-app/ → Next.js Frontend
├── app/ → Pages (Routes)
├── public/ → Images
└── .env.local → Frontend Environment Variables

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YourGitHubUsername/B2B-Tenders.git
cd B2B-Tenders
```


### Backend Setup

1. Move to backend folder  
2. Install dependencies  
3. Create `.env` file with these values:

PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>
JWT_SECRET=supersecretkey

4. Run database migrations  
5. Start backend server  

### Frontend Setup

1. Move to my-next-app folder  
2. Install dependencies  
3. Create `.env.local` file with this value:

NEXT_PUBLIC_API_URL=https://<your-backend-url>

4. Start the frontend development server  

---

## 🛰️ Deployment

### Frontend Deployment (Vercel)

- Connect repository on Vercel  
- Set the project root directory to `my-next-app`  
- Set environment variable `NEXT_PUBLIC_API_URL` to your backend URL  
- Deploy

### Backend Deployment (Render)

- Create new Web Service on Render  
- Connect repository  
- Set root directory to `backend`  
- Add environment variables:
  - PORT
  - DATABASE_URL
  - JWT_SECRET  
- Add build & start commands if required  
- Deploy

---

## 📡 API Endpoints (Examples)

- POST /auth/register  
- POST /auth/login  
- GET /companies  
- POST /tenders/apply  

---

## ✅ Live Demo Links

Frontend:  
https://b2-b-tenders.vercel.app

Backend:  
https://your-backend-url.onrender.com

---

## 📌 Author

Shikhar Gupta  
B2B Tenders — Internship Project Assignment

---

## 📝 License

This project is for learning & demonstration purposes only.




