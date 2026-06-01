# filepath: TechSkillsRadar/backend/app/services/analytics.py
"""
Business logic and data processing for the TechSkillsRadar analytics API.
Loads jobs.json once and provides functions for stats, distributions,
salary analysis, and paginated job search.
"""

import json
from pathlib import Path
from typing import Any
from collections import Counter

import pandas as pd
import numpy as np


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

_DATA_PATH: Path = Path(__file__).resolve().parents[3] / "data" / "raw" / "jobs.json"
_df: pd.DataFrame | None = None


def _load_data() -> pd.DataFrame:
    """Load and cache the jobs dataset as a pandas DataFrame."""
    global _df
    if _df is not None:
        return _df

    with open(_DATA_PATH, "r", encoding="utf-8") as f:
        raw: list[dict[str, Any]] = json.load(f)

    _df = pd.DataFrame(raw)
    return _df


def get_dataframe() -> pd.DataFrame:
    """Public accessor for the cached DataFrame."""
    return _load_data()


# ---------------------------------------------------------------------------
# Analytics functions
# ---------------------------------------------------------------------------

def get_stats() -> dict[str, Any]:
    """
    Return high-level dataset statistics.
    - total_jobs: int
    - skills_tracked: int (unique skills across all jobs)
    - most_demanded_skill: str
    - avg_salary: float (rounded to 2 decimals)
    """
    df: pd.DataFrame = get_dataframe()

    all_skills: list[str] = [
        skill for skills_list in df["skills"] for skill in skills_list
    ]
    skill_counts: Counter = Counter(all_skills)

    total_jobs: int = int(len(df))
    skills_tracked: int = len(skill_counts)
    most_demanded_skill: str = skill_counts.most_common(1)[0][0]
    avg_salary: float = round(float(df["salary_lpa"].mean()), 2)

    return {
        "total_jobs": total_jobs,
        "skills_tracked": skills_tracked,
        "most_demanded_skill": most_demanded_skill,
        "avg_salary": avg_salary,
    }


def get_top_skills(limit: int = 10) -> list[dict[str, Any]]:
    """
    Return top N skills by frequency, sorted descending.
    Each item: {"skill": str, "count": int}
    """
    df: pd.DataFrame = get_dataframe()

    all_skills: list[str] = [
        skill for skills_list in df["skills"] for skill in skills_list
    ]
    skill_counts: Counter = Counter(all_skills)

    return [
        {"skill": skill, "count": count}
        for skill, count in skill_counts.most_common(limit)
    ]


def get_role_distribution() -> list[dict[str, Any]]:
    """
    Return count of jobs per role.
    Each item: {"role": str, "count": int}
    """
    df: pd.DataFrame = get_dataframe()
    dist: pd.Series = df["title"].value_counts()

    return [
        {"role": str(role), "count": int(count)}
        for role, count in dist.items()
    ]


def get_location_distribution() -> list[dict[str, Any]]:
    """
    Return count of jobs per location.
    Each item: {"location": str, "count": int}
    """
    df: pd.DataFrame = get_dataframe()
    dist: pd.Series = df["location"].value_counts()

    return [
        {"location": str(loc), "count": int(count)}
        for loc, count in dist.items()
    ]


def get_salary_by_role() -> list[dict[str, Any]]:
    """
    Return average salary (LPA) per role, sorted descending.
    Each item: {"role": str, "avg_salary": float}
    """
    df: pd.DataFrame = get_dataframe()
    grouped: pd.Series = df.groupby("title")["salary_lpa"].mean().sort_values(ascending=False)

    return [
        {"role": str(role), "avg_salary": round(float(avg), 2)}
        for role, avg in grouped.items()
    ]


def search_jobs(
    role: str | None = None,
    location: str | None = None,
    skill: str | None = None,
    page: int = 1,
    limit: int = 20,
) -> dict[str, Any]:
    """
    Paginated, filtered job search.
    Returns: {"jobs": [...], "total": int, "page": int, "limit": int, "total_pages": int}
    """
    df: pd.DataFrame = get_dataframe()
    filtered: pd.DataFrame = df.copy()

    if role:
        filtered = filtered[
            filtered["title"].str.contains(role, case=False, na=False)
        ]

    if location:
        filtered = filtered[
            filtered["location"].str.contains(location, case=False, na=False)
        ]

    if skill:
        filtered = filtered[
            filtered["skills"].apply(
                lambda skills_list: any(
                    skill.lower() in s.lower() for s in skills_list
                )
            )
        ]

    total: int = int(len(filtered))
    total_pages: int = max(1, int(np.ceil(total / limit)))
    page = max(1, min(page, total_pages))

    start: int = (page - 1) * limit
    end: int = start + limit

    jobs_page: list[dict[str, Any]] = filtered.iloc[start:end].to_dict(orient="records")

    return {
        "jobs": jobs_page,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }
