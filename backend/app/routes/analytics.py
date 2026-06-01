# filepath: TechSkillsRadar/backend/app/routes/analytics.py
"""
API route definitions for the TechSkillsRadar analytics endpoints.
All routes are prefixed with /analytics by the main app router.
"""

from typing import Any, Optional

from fastapi import APIRouter, Query

from app.services.analytics import (
    get_stats,
    get_top_skills,
    get_role_distribution,
    get_location_distribution,
    get_salary_by_role,
    search_jobs,
)

router = APIRouter()


@router.get("/stats")
def stats() -> dict[str, Any]:
    """Return high-level dataset statistics."""
    return get_stats()


@router.get("/skills")
def skills() -> list[dict[str, Any]]:
    """Return top 10 skills by frequency."""
    return get_top_skills()


@router.get("/roles")
def roles() -> list[dict[str, Any]]:
    """Return job count per role."""
    return get_role_distribution()


@router.get("/locations")
def locations() -> list[dict[str, Any]]:
    """Return job count per location."""
    return get_location_distribution()


@router.get("/salary")
def salary() -> list[dict[str, Any]]:
    """Return average salary per role."""
    return get_salary_by_role()


@router.get("/search")
def search(
    role: Optional[str] = Query(None, description="Filter by job title/role"),
    location: Optional[str] = Query(None, description="Filter by location"),
    skill: Optional[str] = Query(None, description="Filter by skill"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Results per page"),
) -> dict[str, Any]:
    """Paginated job search with optional filters."""
    return search_jobs(
        role=role,
        location=location,
        skill=skill,
        page=page,
        limit=limit,
    )