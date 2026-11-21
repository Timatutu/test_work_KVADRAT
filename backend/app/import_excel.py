"""CLI: python -m app.import_excel path/to/file.xlsx"""

import argparse
from pathlib import Path

from app.application.import_complexes import import_complexes
from app.infrastructure.database import Base, SessionFactory, engine
from app.infrastructure import database_models  # Registers the SQLAlchemy table.
from app.infrastructure.excel_source import ExcelComplexSource
from app.infrastructure.sql_repository import SqlComplexRepository


def import_file(file_path: Path) -> int:
    source = ExcelComplexSource()
    repository = SqlComplexRepository(SessionFactory)
    Base.metadata.create_all(engine)
    return import_complexes(file_path, source, repository)


def main() -> None:
    argument_parser = argparse.ArgumentParser(description=__doc__)
    argument_parser.add_argument("path", type=Path)
    arguments = argument_parser.parse_args()
    print(f"Импортировано записей: {import_file(arguments.path)}")


if __name__ == "__main__":
    main()
