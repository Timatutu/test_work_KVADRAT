"""Use cases for the public catalogue."""

from dataclasses import dataclass

from app.domain.complex import SearchCriteria, estimate_total_price

from .ports import ComplexRepository


@dataclass(frozen=True)
class ComplexSearchResult:
    id: int
    city: str
    name: str
    developer: str
    district: str
    category: str
    price_per_sqm: int
    estimated_total: int
    completion: str
    source_url: str | None
    source_domain: str | None


def list_cities(repository: ComplexRepository) -> list[str]:
    return repository.list_cities()


def search_complexes(
    repository: ComplexRepository, criteria: SearchCriteria
) -> list[ComplexSearchResult]:
    complexes = repository.search(criteria)
    return [
        ComplexSearchResult(
            id=complex_.id,
            city=complex_.city,
            name=complex_.name,
            developer=complex_.developer,
            district=complex_.district,
            category=complex_.category,
            price_per_sqm=complex_.price_per_sqm,
            estimated_total=estimate_total_price(complex_.price_per_sqm, criteria.area_sqm),
            completion=complex_.completion,
            source_url=complex_.source_url,
            source_domain=complex_.source_domain,
        )
        for complex_ in complexes
    ]
