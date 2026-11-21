"""Business data and search rules; independent of HTTP, Excel and SQLAlchemy."""

from dataclasses import dataclass
from decimal import Decimal
from typing import Literal


CompletionStatus = Literal["completed", "building"]
HousingCategory = Literal["Бизнес", "Премиум"]


@dataclass(frozen=True)
class ResidentialComplexData:
    city: str
    name: str
    developer: str
    district: str
    category: str
    price_per_sqm: int
    completion: str
    source_url: str | None = None
    source_domain: str | None = None
    sample_area_sqm: Decimal | None = None
    sample_price: int | None = None


@dataclass(frozen=True)
class ResidentialComplex(ResidentialComplexData):
    id: int = 0


@dataclass(frozen=True)
class SearchCriteria:
    area_sqm: Decimal
    city: str | None = None
    max_price_per_sqm: int | None = None
    budget: int | None = None
    completion_status: CompletionStatus | None = None
    category: HousingCategory | None = None


def estimate_total_price(price_per_sqm: int, area_sqm: Decimal) -> int:
    """Estimate a flat price from the complex's minimum square-metre price."""
    return int(Decimal(price_per_sqm) * area_sqm)
