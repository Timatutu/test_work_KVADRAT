"""Persistence model. Business code uses domain dataclasses instead."""

from decimal import Decimal

from sqlalchemy import Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class ResidentialComplexRow(Base):
    __tablename__ = "residential_complexes"
    __table_args__ = (UniqueConstraint("city", "name", name="uq_city_name"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    city: Mapped[str] = mapped_column(String(100), index=True)
    name: Mapped[str] = mapped_column(String(200))
    developer: Mapped[str] = mapped_column(String(200))
    district: Mapped[str] = mapped_column(String(200))
    category: Mapped[str] = mapped_column(String(100))
    price_per_sqm: Mapped[int] = mapped_column(Integer)
    completion: Mapped[str] = mapped_column(String(200))
    source_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    source_domain: Mapped[str | None] = mapped_column(String(200), nullable=True)
    sample_area_sqm: Mapped[Decimal | None] = mapped_column(Numeric(8, 2), nullable=True)
    sample_price: Mapped[int | None] = mapped_column(Integer, nullable=True)
