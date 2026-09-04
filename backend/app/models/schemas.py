from pydantic import BaseModel
from typing import Optional, List

class VerifyRequest(BaseModel):
    query: str  # Can be NAFDAC number OR product name

class VerifyResponse(BaseModel):
    state: str
    identifier: str
    record: Optional[dict] = None
    warnings: List[str] = []
    source: dict
    cached: bool = False
    cache_age_seconds: int = 0
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    source: str
    timestamp: str