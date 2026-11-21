"""HTTP boundary: validate query parameters and return use-case output."""

from decimal import Decimal

from fastapi import APIRouter, Query

from app.application.search_complexes import ComplexSearchResult, list_cities, search_complexes
from app.domain.complex import CompletionStatus, HousingCategory, SearchCriteria
from app.infrastructure.database import SessionFactory
from app.infrastructure.sql_repository import SqlComplexRepository


router = APIRouter(prefix="/api")


@router.get("/health")
def get_health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/cities")
def get_cities() -> list[str]:
    repository = SqlComplexRepository(SessionFactory)
    return list_cities(repository)


@router.get("/complexes")
def get_complexes(
    city: str | None = None,
    area: Decimal = Query(default=Decimal("50"), gt=0, le=10000),
    max_price_per_sqm: int | None = Query(default=None, gt=0),
    budget: int | None = Query(default=None, gt=0),
    completion_status: CompletionStatus | None = None,
    category: HousingCategory | None = None,
) -> list[ComplexSearchResult]:
    criteria = SearchCriteria(
        area_sqm=area, city=city,
        max_price_per_sqm=max_price_per_sqm, budget=budget,
        completion_status=completion_status, category=category,
    )
    repository = SqlComplexRepository(SessionFactory)
    return search_complexes(repository, criteria)
