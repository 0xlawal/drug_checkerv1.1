from supabase import create_client, Client
import os
from datetime import datetime, timedelta

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

async def get_cached_record(query: str) -> dict | None:
    if not supabase:
        return None
    try:
        result = supabase.table("verifications").select("*").eq("identifier", query).execute()
        if result.data:
            record = result.data[0]
            # Check TTL (24 hours)
            created_at = datetime.fromisoformat(record["created_at"].replace("Z", "+00:00"))
            if datetime.now(created_at.tzinfo) - created_at < timedelta(hours=24):
                return record
        return None
    except Exception:
        return None

async def save_cached_record(query: str, record_data: dict) -> None:
    if not supabase:
        return
    try:
        supabase.table("verifications").upsert({
            "identifier": query,
            "record_data": record_data,
            "created_at": datetime.now().isoformat(),
        }).execute()
    except Exception:
        pass