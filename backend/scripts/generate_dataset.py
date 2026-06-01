# filepath: TechSkillsRadar/backend/scripts/generate_dataset.py
"""
Generates a synthetic tech job dataset with 10,000 records.
Outputs to data/raw/jobs.json with realistic distributions for
roles, locations, skills, salaries, and experience levels.
"""

import json
import uuid
import random
from pathlib import Path
from datetime import datetime, timedelta
from typing import Any

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

NUM_JOBS: int = 10_000

COMPANIES: list[str] = [
    "TechCorp India", "Infosys", "Wipro", "TCS", "HCL Technologies",
    "Flipkart", "Razorpay", "Zomato", "Swiggy", "Paytm",
    "Google India", "Amazon India", "Microsoft India", "Meta India",
    "PhonePe", "CRED", "Meesho", "Groww", "Zerodha", "Ola",
    "Freshworks", "Zoho", "MakeMyTrip", "Myntra", "Postman",
    "Atlassian India", "Adobe India", "Salesforce India",
    "Oracle India", "SAP India", "Jio Platforms", "Dream11",
    "Unacademy", "BYJU'S", "ShareChat",
]

# Weighted location distribution — Bangalore & Hyderabad most common
LOCATIONS: list[str] = [
    "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Remote",
]
LOCATION_WEIGHTS: list[float] = [0.28, 0.12, 0.10, 0.22, 0.12, 0.08, 0.08]

# Weighted role distribution — Data Engineer & Full Stack Developer most common
ROLES: list[str] = [
    "Data Engineer", "Data Scientist", "ML Engineer",
    "DevOps Engineer", "Backend Developer",
    "Frontend Developer", "Full Stack Developer",
]
ROLE_WEIGHTS: list[float] = [0.22, 0.13, 0.10, 0.12, 0.13, 0.08, 0.22]

# Salary ranges in LPA (lakhs per annum) — (min, max)
SALARY_RANGES: dict[str, tuple[float, float]] = {
    "ML Engineer":          (20.0, 45.0),
    "Data Scientist":       (15.0, 35.0),
    "Data Engineer":        (12.0, 30.0),
    "DevOps Engineer":      (12.0, 28.0),
    "Backend Developer":    (10.0, 25.0),
    "Full Stack Developer": (10.0, 22.0),
    "Frontend Developer":   (8.0, 18.0),
}

# Experience ranges in years — (min, max)
EXPERIENCE_RANGES: dict[str, tuple[int, int]] = {
    "ML Engineer":          (2, 8),
    "Data Scientist":       (1, 7),
    "Data Engineer":        (1, 8),
    "DevOps Engineer":      (1, 7),
    "Backend Developer":    (0, 6),
    "Full Stack Developer": (0, 7),
    "Frontend Developer":   (0, 5),
}

# Role-specific skill pools
ROLE_SKILLS: dict[str, list[str]] = {
    "Data Engineer": [
        "Python", "SQL", "Spark", "Airflow", "Kafka",
        "AWS", "Docker", "Kubernetes", "PostgreSQL", "Terraform",
    ],
    "Data Scientist": [
        "Python", "SQL", "TensorFlow", "PyTorch",
        "Spark", "AWS", "PostgreSQL", "MongoDB",
    ],
    "ML Engineer": [
        "Python", "TensorFlow", "PyTorch", "Docker",
        "Kubernetes", "AWS", "SQL", "Spark", "Kafka",
    ],
    "DevOps Engineer": [
        "Docker", "Kubernetes", "Terraform", "AWS",
        "Python", "SQL", "Kafka", "Airflow", "PostgreSQL",
    ],
    "Backend Developer": [
        "Python", "FastAPI", "PostgreSQL", "MongoDB",
        "Docker", "SQL", "AWS", "Kafka", "Kubernetes",
    ],
    "Frontend Developer": [
        "React", "Python", "SQL", "Docker",
        "AWS", "MongoDB", "FastAPI",
    ],
    "Full Stack Developer": [
        "React", "Python", "SQL", "Docker",
        "MongoDB", "PostgreSQL", "AWS", "FastAPI", "Kubernetes",
    ],
}

# Skills that should appear in 60%+ of all jobs
HIGH_FREQUENCY_SKILLS: list[str] = ["Python", "SQL"]


def generate_job(job_index: int) -> dict[str, Any]:
    """Generate a single job record with realistic distributions."""
    role: str = random.choices(ROLES, weights=ROLE_WEIGHTS, k=1)[0]
    location: str = random.choices(LOCATIONS, weights=LOCATION_WEIGHTS, k=1)[0]

    sal_min, sal_max = SALARY_RANGES[role]
    salary_lpa: float = round(random.uniform(sal_min, sal_max), 1)

    exp_min, exp_max = EXPERIENCE_RANGES[role]
    experience_years: int = random.randint(exp_min, exp_max)

    # Build skill list: ensure Python/SQL appear frequently
    pool = ROLE_SKILLS[role].copy()
    num_skills: int = random.randint(3, 6)

    selected_skills: list[str] = []

    # 70% chance to force-include each high-frequency skill if in pool
    for hf_skill in HIGH_FREQUENCY_SKILLS:
        if hf_skill in pool and random.random() < 0.70:
            selected_skills.append(hf_skill)
            pool.remove(hf_skill)

    remaining: int = num_skills - len(selected_skills)
    if remaining > 0:
        remaining = min(remaining, len(pool))
        selected_skills.extend(random.sample(pool, remaining))

    random.shuffle(selected_skills)

    # Random posted date within last 365 days
    days_ago: int = random.randint(0, 365)
    posted_date: str = (
        datetime(2024, 11, 15) - timedelta(days=days_ago)
    ).strftime("%Y-%m-%d")

    return {
        "id": str(uuid.uuid4()),
        "title": role,
        "company": random.choice(COMPANIES),
        "location": location,
        "salary_lpa": salary_lpa,
        "experience_years": experience_years,
        "skills": selected_skills,
        "posted_date": posted_date,
    }


def main() -> None:
    """Generate the full dataset and write to JSON."""
    random.seed(42)  # Reproducible output

    jobs: list[dict[str, Any]] = [generate_job(i) for i in range(NUM_JOBS)]

    # Verify distribution targets
    all_skills: list[str] = [s for job in jobs for s in job["skills"]]
    python_pct = sum(1 for j in jobs if "Python" in j["skills"]) / len(jobs) * 100
    sql_pct = sum(1 for j in jobs if "SQL" in j["skills"]) / len(jobs) * 100

    root: Path = Path(__file__).resolve().parents[2]
    output_path: Path = root / "data" / "raw" / "jobs.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)

    print(f"✅ Generated {len(jobs):,} jobs → {output_path}")
    print(f"   Python appears in {python_pct:.1f}% of jobs")
    print(f"   SQL appears in {sql_pct:.1f}% of jobs")
    print(f"   Unique skills: {len(set(all_skills))}")


if __name__ == "__main__":
    main()