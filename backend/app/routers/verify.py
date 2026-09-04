from fastapi import APIRouter, HTTPException
from app.models.schemas import VerifyRequest, VerifyResponse, HealthResponse
from app.services.greenbook import query_greenbook_by_nrn, query_greenbook_by_name, is_nrn, normalize_nrn
from app.utils.cache import get_cached_record, save_cached_record
from datetime import datetime

router = APIRouter()

@router.post("/verify", response_model=VerifyResponse)
async def verify(request: VerifyRequest):
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query is required")

    normalized = normalize_nrn(query) if is_nrn(query) else query.lower()

    # Check cache
    cached = await get_cached_record(normalized)
    if cached:
        return {
            "state": "registry_match",
            "identifier": normalized,
            "record": cached["record_data"],
            "warnings": [],
            "source": {
                "name": "NAFDAC Greenbook (cached)",
                "retrievedAt": datetime.now().isoformat(),
                "url": "https://greenbook.nafdac.gov.ng/"
            },
            "cached": True,
            "cache_age_seconds": int((datetime.now() - datetime.fromisoformat(cached["created_at"].replace("Z", "+00:00"))).total_seconds()),
        }

    # Query Greenbook
    if is_nrn(query):
        record = await query_greenbook_by_nrn(query)
    else:
        record = await query_greenbook_by_name(query)

    if record:
        await save_cached_record(normalized, record)
        return {
            "state": "registry_match",
            "identifier": normalized,
            "record": record,
            "warnings": [],
            "source": {
                "name": "NAFDAC Greenbook",
                "retrievedAt": datetime.now().isoformat(),
                "url": "https://greenbook.nafdac.gov.ng/"
            },
            "cached": False,
            "cache_age_seconds": 0,
        }
    else:
        return {
            "state": "no_registry_match",
            "identifier": normalized,
            "record": None,
            "warnings": [],
            "source": {
                "name": "NAFDAC Greenbook",
                "retrievedAt": datetime.now().isoformat(),
                "url": "https://greenbook.nafdac.gov.ng/"
            },
            "cached": False,
            "cache_age_seconds": 0,
            "message": "No record found for the provided query.",
        }

@router.get("/health", response_model=HealthResponse)
async def health():
    return {
        "status": "ok",
        "source": "NAFDAC Greenbook",
        "timestamp": datetime.now().isoformat(),
    }