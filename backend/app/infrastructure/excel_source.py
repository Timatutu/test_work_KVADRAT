"""Read the workbook's 'ЖК' sheet and optional source details."""

from dataclasses import dataclass
from decimal import Decimal
from pathlib import Path

from openpyxl import load_workbook
from openpyxl.cell.cell import Cell
from openpyxl.worksheet.worksheet import Worksheet

from app.domain.complex import ResidentialComplexData

MAIN_SHEET = "ЖК"
DETAIL_SHEET = "Цены и источники"
HEADER_ROW = 5
FIRST_DATA_ROW = 6
HEADERS = {
    "city": "Город", "name": "Название ЖК", "developer": "Застройщик",
    "district": "Район", "category": "Класс", "price_per_sqm": "Цена от (₽ за м²)",
    "completion": "Срок сдачи", "source_domain": "Ссылка на источник",
}


@dataclass(frozen=True)
class SourceDetails:
    source_url: str | None = None
    sample_price: int | None = None
    sample_area_sqm: Decimal | None = None


def cell_text(cell: Cell) -> str:
    return str(cell.value or "").strip()


def hyperlink(cell: Cell) -> str | None:
    target = cell.hyperlink.target if cell.hyperlink else None
    return target if target and target.startswith(("https://", "http://")) else None


def fallback_source_url(source_cell: Cell) -> str | None:
    direct_link = hyperlink(source_cell)
    if direct_link:
        return direct_link
    domain = cell_text(source_cell)
    if not domain:
        return None
    return domain if domain.startswith(("https://", "http://")) else f"https://{domain}"


def column_numbers(sheet: Worksheet) -> dict[str, int]:
    header_cells = next(sheet.iter_rows(min_row=HEADER_ROW, max_row=HEADER_ROW))
    columns = {cell_text(cell): cell.column - 1 for cell in header_cells if cell.value}
    missing_headers = set(HEADERS.values()) - set(columns)
    if missing_headers:
        raise ValueError(f"Лист '{MAIN_SHEET}': отсутствуют столбцы: {', '.join(sorted(missing_headers))}")
    return columns


def read_source_details(sheet: Worksheet | None) -> dict[str, SourceDetails]:
    if sheet is None:
        return {}
    details_by_name: dict[str, SourceDetails] = {}
    for row in sheet.iter_rows(min_row=FIRST_DATA_ROW):
        name = cell_text(row[0])
        if not name:
            continue
        source_url = next(
            (link for cell in (row[4], row[2], row[3]) if (link := hyperlink(cell))), None
        )
        raw_price = row[2].value
        raw_area = row[3].value
        details_by_name[name] = SourceDetails(
            source_url=source_url,
            sample_price=int(raw_price) if isinstance(raw_price, (int, float)) else None,
            sample_area_sqm=Decimal(str(raw_area)) if isinstance(raw_area, (int, float)) else None,
        )
    return details_by_name


class ExcelComplexSource:
    def read(self, file_path: Path) -> list[ResidentialComplexData]:
        workbook = load_workbook(file_path, read_only=False, data_only=True)
        try:
            if MAIN_SHEET not in workbook:
                raise ValueError(f"Отсутствует лист '{MAIN_SHEET}'")
            main_sheet = workbook[MAIN_SHEET]
            columns = column_numbers(main_sheet)
            detail_sheet = workbook[DETAIL_SHEET] if DETAIL_SHEET in workbook else None
            details_by_name = read_source_details(detail_sheet)
            complexes: list[ResidentialComplexData] = []
            for row in main_sheet.iter_rows(min_row=FIRST_DATA_ROW):
                def field(field_name: str) -> Cell:
                    return row[columns[HEADERS[field_name]]]

                name = cell_text(field("name"))
                raw_price = field("price_per_sqm").value
                if not name and raw_price is None:
                    continue  # Notes below the table are not residential complexes.
                city = cell_text(field("city"))
                if not city or not name or raw_price is None:
                    raise ValueError(f"Лист '{MAIN_SHEET}', строка {row[0].row}: нужны город, название и цена")
                if not isinstance(raw_price, (int, float)) or raw_price <= 0:
                    raise ValueError(f"Лист '{MAIN_SHEET}', строка {row[0].row}: неверная цена")
                details = details_by_name.get(name, SourceDetails())
                source_cell = field("source_domain")
                complexes.append(ResidentialComplexData(
                    city=city, name=name, developer=cell_text(field("developer")),
                    district=cell_text(field("district")), category=cell_text(field("category")),
                    price_per_sqm=round(raw_price), completion=cell_text(field("completion")),
                    source_domain=cell_text(source_cell) or None,
                    source_url=details.source_url or fallback_source_url(source_cell),
                    sample_price=details.sample_price, sample_area_sqm=details.sample_area_sqm,
                ))
            if not complexes:
                raise ValueError(f"Лист '{MAIN_SHEET}' не содержит записей")
            return complexes
        finally:
            workbook.close()
