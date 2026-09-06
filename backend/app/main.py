from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import verify
from app.models.schemas import HealthResponse
import os
from datetime import datetime

app = FastAPI(
    title="DrugChecker API",
    description="NAFDAC Registry Verification Aid",
    version="1.1.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://drug-checker-v1-1.vercel.app",
        "https://drug-checker.vercel.app",
        "https://drug-checkerv1-11-tawny.vercel.app",   # <-- ADD YOUR EXACT DOMAIN
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(verify.router, prefix="/api", tags=["verify"])

@app.get("/")
async def root():
    return {"message": "DrugChecker API", "version": "1.1.0"}

@app.get("/health", response_model=HealthResponse)
async def health():
    return {
        "status": "ok",
        "source": "NAFDAC Greenbook",
        "timestamp": datetime.now().isoformat(),
    }