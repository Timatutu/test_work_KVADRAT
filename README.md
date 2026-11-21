# Подбор новостроек

Веб-приложение на FastAPI, TypeScript и PostgreSQL. Исходные данные загружаются из `Novostroyki_15_fin.xlsx`.

Краткое описание работы проекта, идей для риелторов и скриншоты — в [docs/README.md](docs/README.md).
Схемы движения данных и компонентов — в [docs/architecture.md](docs/architecture.md).

## Структура проекта

Сервер разделён по слоям. Зависимости направлены от внешних механизмов к правилам приложения:

| Слой | Файл | Назначение |
| --- | --- | --- |
| Предметная область | `backend/app/domain/complex.py` | Данные ЖК, параметры поиска и формула ориентировочной стоимости. |
| Сценарии | `backend/app/application/search_complexes.py` | Получение городов и результатов поиска. |
| Сценарии | `backend/app/application/import_complexes.py` | Импорт набора ЖК. |
| Контракты | `backend/app/application/ports.py` | Интерфейсы источника данных и репозитория. |
| Инфраструктура | `backend/app/infrastructure/excel_source.py` | Чтение и проверка Excel. |
| Инфраструктура | `backend/app/infrastructure/database.py`, `database_models.py`, `sql_repository.py` | Подключение к PostgreSQL, таблица и SQL-запросы. |
| HTTP | `backend/app/api/routes.py` | Маршруты FastAPI и проверка параметров запроса. |
| Запуск | `backend/app/main.py`, `import_excel.py` | Сборка API и команда импорта. |
| Зависимости | `backend/pyproject.toml`, `uv.lock` | Описание и закреплённые версии Python-пакетов для uv. |

Во фронтенде `page.ts` содержит разметку каталога, `mascot.ts` и `mascot.css` — персонажа и сообщение для агентств, `catalog-page.ts` связывает форму и результаты, а `main.ts` выбирает страницу. `api.ts` выполняет запросы, `cards.ts` и `chart.ts` отображают данные. Общие типы находятся в `types.ts`, форматирование и экранирование HTML — в `format.ts`.

Страница `/agency` находится в `agency-page.ts`; интерактивные окна — в `agency-demo.ts`. Демо помощника собирает подборку по данным API. Демо MCP показывает ответы будущих инструментов `list_cities` и `search_complexes` в JSON. Настоящие ИИ-модель и MCP-сервер пока не подключены.

## Запуск

Нужны Docker и Docker Compose. Из корня проекта:

```bash
docker compose up --build
```

Откройте [http://localhost:8080](http://localhost:8080). При запуске API создаёт таблицу и импортирует исходный Excel. Документация API: [http://localhost:8000/docs](http://localhost:8000/docs). Сервис содержит маршруты `GET /api/cities`, `GET /api/complexes` и `GET /api/health`.

## Подбор

Фильтры: город, желаемая площадь, предельная цена за м² и общий бюджет. Дополнительно можно выбрать готовность ЖК (`Сдан` или `Строится`) и класс жилья (`Бизнес` или `Премиум`); оба фильтра необязательны. Ограничения можно применять вместе. Выдача отсортирована по цене за м². Расчётная стоимость = выбранная площадь × минимальная цена за м² для ЖК. Это оценка, поскольку в исходной таблице нет полного списка квартир и площадей по каждому ЖК.

## Обновление данных

Замените `Novostroyki_15_fin.xlsx` новым файлом той же структуры и выполните:

```bash
docker compose run --rm api python -m app.import_excel /data/Novostroyki_15_fin.xlsx
```

Импорт читает лист `ЖК` по названиям столбцов, а ссылки и доступные примеры площади/цены — из листа `Цены и источники`. Повторный запуск обновляет существующие ЖК и добавляет новые. Удалённые из Excel ЖК остаются в базе: импорт не удаляет данные автоматически.

Для локальной разработки без Docker задайте `DATABASE_URL`. Из папки `backend` выполните `uv sync`, затем `uv run python -m app.import_excel <файл>` и `uv run uvicorn app.main:app --reload`. Зависимости сервера описаны в `pyproject.toml` и закреплены в `uv.lock`. Для фронтенда выполните `npm install` и `npm run dev` в `frontend`; Vite отправляет запросы `/api` на локальный FastAPI.
