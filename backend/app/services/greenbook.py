import httpx
import re
from typing import Optional, Dict, Any

GREENBOOK_URL = "https://greenbook.nafdac.gov.ng/"

def normalize_nrn(value: str) -> str:
    return value.strip().replace(" ", "").upper()

def is_nrn(value: str) -> bool:
    # Check if it looks like a NAFDAC registration number
    pattern = r'^[A-Z0-9]{1,4}[-/][A-Z0-9]{1,4}$'
    return bool(re.match(pattern, value.strip()))

def _map_record(row: dict) -> dict:
    return {
        "productName": row.get("product_name", ""),
        "activeIngredients": row.get("ingredient", {}).get("ingredient_name", ""),
        "productCategory": row.get("category_name", ""),
        "nafdacNumber": row.get("NAFDAC", ""),
        "form": row.get("form", {}).get("name", ""),
        "routeOfAdministration": row.get("route", {}).get("name", ""),
        "strengths": row.get("strength", ""),
        "applicantName": row.get("applicant", {}).get("name", ""),
        "approvalDate": row.get("approval_date"),
        "expiryDate": row.get("expiry_date"),
        "status": row.get("status", "Unknown"),
    }

async def query_greenbook_by_nrn(nrn: str) -> Optional[Dict[str, Any]]:
    """
    Query the NAFDAC Greenbook by NAFDAC registration number.
    Returns the first matching record or None.
    """
    normalized = normalize_nrn(nrn)
    params = {
        "draw": "1",
        "start": "0",
        "length": "10",
        "search[value]": "",
        "search[regex]": "false",
        "order[0][column]": "5",
        "order[0][dir]": "asc",
        "columns[5][search][value]": normalized,
        "columns[5][search][regex]": "false",
    }
    # Add all column definitions
    columns = [
        "product_name", "ingredient.ingredient_name", "product_category.name",
        "product_category_id", "ingredient.synonym", "NAFDAC",
        "form.name", "route.name", "strength", "applicant.name",
        "approval_date", "status"
    ]
    for idx, col in enumerate(columns):
        params[f"columns[{idx}][data]"] = col
        params[f"columns[{idx}][name]"] = col
        params[f"columns[{idx}][searchable]"] = "true"
        params[f"columns[{idx}][orderable]"] = "true" if idx != 2 else "false"
        params[f"columns[{idx}][search][value]"] = normalized if idx == 5 else ""
        params[f"columns[{idx}][search][regex]"] = "false"

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(GREENBOOK_URL, params=params, headers={
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "DrugChecker/1.1 (public registry lookup aid)",
            })
            response.raise_for_status()
            data = response.json()
            rows = data.get("data", [])
            if rows:
                # Find exact match by NRN
                for row in rows:
                    if normalize_nrn(row.get("NAFDAC", "")) == normalized:
                        return _map_record(row)
            return None
        except Exception:
            return None

async def query_greenbook_by_name(name: str) -> Optional[Dict[str, Any]]:
    """
    Query the NAFDAC Greenbook by product name using the global search.
    Returns the first matching record or None.
    """
    params = {
        "draw": "1",
        "start": "0",
        "length": "10",
        "search[value]": name,
        "search[regex]": "false",
        "order[0][column]": "5",
        "order[0][dir]": "asc",
    }
    columns = [
        "product_name", "ingredient.ingredient_name", "product_category.name",
        "product_category_id", "ingredient.synonym", "NAFDAC",
        "form.name", "route.name", "strength", "applicant.name",
        "approval_date", "status"
    ]
    for idx, col in enumerate(columns):
        params[f"columns[{idx}][data]"] = col
        params[f"columns[{idx}][name]"] = col
        params[f"columns[{idx}][searchable]"] = "true"
        params[f"columns[{idx}][orderable]"] = "true" if idx != 2 else "false"
        params[f"columns[{idx}][search][value]"] = ""
        params[f"columns[{idx}][search][regex]"] = "false"

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(GREENBOOK_URL, params=params, headers={
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "DrugChecker/1.1 (public registry lookup aid)",
            })
            response.raise_for_status()
            data = response.json()
            rows = data.get("data", [])
            if rows:
                return _map_record(rows[0])
            return None
        except Exception:
            return None