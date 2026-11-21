"""Interfaces that infrastructure must provide to application use cases."""

from pathlib import Path
from typing import Protocol, Sequence

from app.domain.complex import ResidentialComplex, ResidentialComplexData, SearchCriteria


class ComplexRepository(Protocol):
    def list_cities(self) -> list[str]: ...

    def search(self, criteria: SearchCriteria) -> list[ResidentialComplex]: ...

    def upsert_many(self, complexes: Sequence[ResidentialComplexData]) -> None: ...


class ComplexSource(Protocol):
    def read(self, file_path: Path) -> list[ResidentialComplexData]: ...
