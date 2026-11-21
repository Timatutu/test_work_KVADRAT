"""Validate a source file, then save its records in one transaction."""

from pathlib import Path

from .ports import ComplexRepository, ComplexSource


def import_complexes(
    file_path: Path, source: ComplexSource, repository: ComplexRepository
) -> int:
    complexes = source.read(file_path)
    repository.upsert_many(complexes)
    return len(complexes)
