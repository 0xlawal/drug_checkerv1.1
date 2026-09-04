import logging
from supabase import create_client, Client
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

# Configure logger
logger = logging.getLogger(__name__)

# Load Supabase credentials from environment
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client if credentials are available
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        logger.info("✅ Supabase cache connected successfully")
    except Exception as e:
        supabase = None
        logger.error(f"❌ Failed to connect to Supabase: {e}")
else:
    supabase = None
    logger.warning("⚠️ Supabase not configured – caching is DISABLED. Set SUPABASE_URL and SUPABASE_KEY environment variables.")

async def get_cached_record(query: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a cached record from Supabase.
    Returns the record if found and not expired (TTL: 24 hours).
    """
    if not supabase:
        logger.debug("Cache miss: Supabase not available")
        return None

    try:
        result = supabase.table("verifications").select("*").eq("identifier", query).execute()
        if result.data:
            record = result.data[0]
            # Check TTL (24 hours)
            created_at = datetime.fromisoformat(record["created_at"].replace("Z", "+00:00"))
            age = (datetime.now(created_at.tzinfo) - created_at).total_seconds()
            if age < 86400:  # 24 hours
                logger.debug(f"Cache hit for {query} (age: {age:.0f}s)")
                return record
            else:
                logger.debug(f"Cache expired for {query} (age: {age:.0f}s)")
        return None
    except Exception as e:
        logger.error(f"Error reading from cache: {e}", exc_info=True)
        return None

async def save_cached_record(query: str, record_data: Dict[str, Any]) -> None:
    """
    Save a record to Supabase cache.
    """
    if not supabase:
        logger.debug("Cache save skipped: Supabase not available")
        return

    try:
        supabase.table("verifications").upsert({
            "identifier": query,
            "record_data": record_data,
            "created_at": datetime.now().isoformat(),
        }).execute()
        logger.debug(f"Cache saved for {query}")
    except Exception as e:
        logger.error(f"Error saving to cache: {e}", exc_info=True)