# filepath: TechSkillsRadar/backend/app/main.py
"""
FastAPI application entry point for TechSkillsRadar.
Configures CORS, registers the analytics router, and
pre-loads the dataset at startup for fast responses.
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analytics import router as analytics_router
from app.services.analytics import get_dataframe


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Load the dataset once at application startup."""
    df = get_dataframe()
    print(f"📊 Dataset loaded: {len(df):,} jobs")
    yield


app = FastAPI(
    title="TechSkillsRadar API",
    description="Job Market Intelligence and Analytics Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"],
)


@app.get("/", tags=["Health"])
def health_check() -> dict[str, str]:
    """Root health check endpoint."""
    return {
        "status": "running",
        "message": "TechSkillsRadar API is live 🚀",
    }