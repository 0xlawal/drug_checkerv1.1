# DrugChecker – NAFDAC Registry Verification

A web application that helps users verify NAFDAC registration numbers and product names against Nigeria's official Greenbook database.

Live demo: [https://drug-checker.vercel.app](https://drug-checker.vercel.app)

---

## Features

- Search by NAFDAC number or product name
- Displays registry record (product name, applicant, status, expiry, etc.)
- Caches results for faster lookups
- Mobile‑responsive UI
- Clear safety disclaimers

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (frontend), Render (backend)

---

## Local Development

### 1. Clone the repository

git clone https://github.com/0xlawal/drug_checkerv1.1.git
cd drug_checkerv1.1

### 2. Set up the frontend

cd frontend
npm install
npm run dev
The frontend will run at http://localhost:5173.

### 3. Set up the backend

cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

### Create a .env file in the backend folder:
env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

### Then start the server:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

The backend will run at http://localhost:8000.

### 4. Connect frontend to backend
Create a .env file in the frontend folder:
env
VITE_API_URL=http://localhost:8000

Restart the frontend dev server.
Environment Variables
Variable	Description
SUPABASE_URL	Your Supabase project URL
SUPABASE_KEY	Your Supabase anon key
VITE_API_URL	Backend API URL (for frontend)

Deployment
Frontend (Vercel)
Push code to GitHub.

Go to vercel.com → Add New → Project.

Select your repository.

Set Root Directory to frontend.

Set Build Command to npm run build.

Set Output Directory to dist.

Add environment variable: VITE_API_URL = your Render backend URL.

Deploy.

Backend (Render)
Go to render.com → New → Web Service.

Select your repository.

Set Root Directory to backend.

Set Build Command to pip install -r requirements.txt.

Set Start Command to uvicorn app.main:app --host 0.0.0.0 --port 8000.

Add environment variables: SUPABASE_URL, SUPABASE_KEY.

Deploy.

Database (Supabase)
Create a project at supabase.com.

Create a table called verifications:

sql
CREATE TABLE verifications (
  id SERIAL PRIMARY KEY,
  identifier TEXT NOT NULL,
  record_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
Copy your SUPABASE_URL and SUPABASE_KEY into the backend environment variables.

Pushing to GitHub

git add .
git commit -m "Your commit message"
git push
If you get an authentication error, use a Personal Access Token from GitHub Settings.

License
MIT

Contact
Lawal Goodness Inioluwa – goodnesslawal2@gmail.com

GitHub: github.com/0xlawal
