# 📡 TechSkillsRadar

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**TechSkillsRadar** is a premium, SaaS-quality Job Market Intelligence Platform designed to analyze technology job market trends. Powered by a large-scale dataset (10,000+ job records), it presents deep insights through a modern, responsive analytics dashboard. 

The platform is designed to help students, job seekers, data science aspirants, and software engineers understand skill demand, salary trends, hiring hubs, and career gaps in the tech industry.

---

## ✨ Features

### Current Features (v1 & v2 Core)
* **Premium SaaS Dashboard**: Dark mode UI with a persistent sidebar layout and smooth animations.
* **Interactive Data Visualization**: Top Skills, Role Distribution, Salary Trends, and Location Analytics using Recharts.
* **Deep Search Engine**: Filter jobs by role, location, or specific skill, complete with pagination.
* **FastAPI Backend**: Highly performant backend that caches the dataset in memory during application startup for sub-millisecond API response times.

### 🚀 Upcoming Features (Machine Learning Pipeline)
* Skill Gap Analyzer
* Salary Prediction Engine (Random Forest / Scikit-Learn)
* Recommendation System for Job Matching
* User Auth & Saved Searches
* Exportable PDF Reports
* Resume Skill Extraction & Parsing

---

## 🛠 Tech Stack

**Frontend:**
* React 19 + Vite
* Tailwind CSS v4 (SaaS Dark Mode Theme)
* Recharts (Data Visualization)
* React Router v7
* Framer Motion & Lucide React (Icons & Animations)

**Backend:**
* Python 3.14+
* FastAPI & Uvicorn
* Pandas & NumPy (Data Processing)

---

## 📂 Project Architecture

```text
TechSkillsRadar/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── main.py           # App entry point & dataset loading
│   │   ├── routes/           # API Endpoints (analytics.py)
│   │   └── services/         # Business logic & Pandas processing
│   ├── scripts/              # Dataset generation tools
│   └── requirements.txt      
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/       # Layout, Sidebar, Charts, Cards
│   │   ├── pages/            # Dashboard, Search
│   │   └── services/         # Axios API configuration
│   ├── index.html
│   └── vite.config.js
└── data/                     # Data Layer
    └── raw/
        └── jobs.json         # Master dataset (10,000 records)
```

---

## 💻 Code Snippets

### 1. High-Performance Dataset Loading (Backend)
To ensure blazing fast APIs, the JSON dataset is pre-loaded into memory using Pandas during FastAPI's lifespan startup event.

```python
# backend/app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.services.analytics import get_dataframe

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the dataset once at application startup for speed."""
    print("⏳ Loading dataset into memory...")
    get_dataframe()  # Triggers Pandas read_json and caching
    print("📊 Dataset loaded successfully.")
    yield
    print("🛑 Shutting down backend.")

app = FastAPI(title="TechSkillsRadar API", lifespan=lifespan)
```

### 2. Premium Layout Configuration (Frontend)
The frontend uses a modern, responsive layout that shifts content aside on desktop to accommodate the persistent sidebar.

```jsx
// frontend/src/components/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-surface-900 text-white font-sans">
      <Sidebar />
      <div className="flex w-full flex-col md:pl-64">
        {/* Mobile Header logic omitted for brevity */}
        <main className="flex-1 p-6 md:p-10 animate-fade-in-up">
          <div className="mx-auto max-w-6xl">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
```

### 3. Data Structure Model
Each job record in the `data/raw/jobs.json` file is strictly formatted to support deep analytics.

```json
{
  "job_id": 1,
  "title": "Data Engineer",
  "company": "Google",
  "location": "Bangalore",
  "salary": 1800000,
  "experience": 3,
  "skills": ["Python", "SQL", "Docker"],
  "posted_date": "2026-05-01"
}
```

---

## 🚦 Getting Started

### Prerequisites
* **Node.js** (v20+)
* **Python** (v3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/TechSkillsRadar.git
cd TechSkillsRadar
```

### 2. Setup the Backend
```bash
cd backend
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server on port 8000
uvicorn app.main:app --reload
```
The API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The App will run on `http://localhost:5173/` or `http://localhost:5174/`.

---

## 📡 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/analytics/stats` | `GET` | Retrieve global statistics (total jobs, avg salary, etc.) |
| `/analytics/skills` | `GET` | Get frequency of top skills demanded |
| `/analytics/roles` | `GET` | Get role distribution insights |
| `/analytics/locations` | `GET` | Get hiring distribution across cities |
| `/analytics/salary` | `GET` | Salary bucket distributions |
| `/analytics/search` | `GET` | Search jobs with `?role=`, `?location=`, `?skill=`, `?page=` params |

---

## 🛡 License
This project is for portfolio and educational purposes. All data generated is synthetic.
