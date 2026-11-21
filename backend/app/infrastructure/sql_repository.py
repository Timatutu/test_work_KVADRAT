"""PostgreSQL implementation of the catalogue repository."""

from dataclasses import asdict
from typing import Sequence

from sqlalchemy import func, select
from sqlalchemy.orm import Session, sessionmaker

from app.domain.complex import ResidentialComplex, ResidentialComplexData, SearchCriteria

from .database_models import ResidentialComplexRow


def to_domain(row: ResidentialComplexRow) -> ResidentialComplex:
    return ResidentialComplex(
        id=row.id,
        city=row.city,
        name=row.name,
        developer=row.developer,
        district=row.district,
        category=row.category,
        price_per_sqm=row.price_per_sqm,
        completion=row.completion,
        source_url=row.source_url,
        source_domain=row.source_domain,
        sample_area_sqm=row.sample_area_sqm,
        sample_price=row.sample_price,
    )


class SqlComplexRepository:
    def __init__(self, session_factory: sessionmaker[Session]) -> None:
        self.session_factory = session_factory

    def list_cities(self) -> list[str]:
        with self.session_factory() as session:
            statement = select(ResidentialComplexRow.city).distinct().order_by(ResidentialComplexRow.city)
            return list(session.scalars(statement).all())

    def search(self, criteria: SearchCriteria) -> list[ResidentialComplex]:
        statement = select(ResidentialComplexRow)
        if criteria.city:
            statement = statement.where(ResidentialComplexRow.city == criteria.city)
        if criteria.max_price_per_sqm is not None:
            statement = statement.where(
                ResidentialComplexRow.price_per_sqm <= criteria.max_price_per_sqm
            )
        if criteria.budget is not None:
            statement = statement.where(
                ResidentialComplexRow.price_per_sqm * criteria.area_sqm <= criteria.budget
            )
        if criteria.category is not None:
            statement = statement.where(ResidentialComplexRow.category == criteria.category)
        if criteria.completion_status is not None:
            normalized_completion = func.lower(func.trim(ResidentialComplexRow.completion))
            completed = normalized_completion.like("сдан%")
            if criteria.completion_status == "completed":
                statement = statement.where(completed)
            else:
                statement = statement.where(~completed, normalized_completion != "")
        statement = statement.order_by(ResidentialComplexRow.price_per_sqm, ResidentialComplexRow.name)
        with self.session_factory() as session:
            return [to_domain(row) for row in session.scalars(statement).all()]

    def upsert_many(self, complexes: Sequence[ResidentialComplexData]) -> None:
        with self.session_factory.begin() as session:
            for complex_ in complexes:
                statement = select(ResidentialComplexRow).where(
                    ResidentialComplexRow.city == complex_.city,
                    ResidentialComplexRow.name == complex_.name,
                )
                existing_row = session.scalar(statement)
                field_values = asdict(complex_)
                if existing_row is None:
                    session.add(ResidentialComplexRow(**field_values))
                else:
                    for field_name, field_value in field_values.items():
                        setattr(existing_row, field_name, field_value)
