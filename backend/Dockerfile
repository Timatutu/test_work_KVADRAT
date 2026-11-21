FROM ghcr.io/astral-sh/uv:0.13.8 AS uv

FROM python:3.12-slim
COPY --from=uv /uv /bin/uv
WORKDIR /code
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev
COPY app ./app
ENV PATH="/code/.venv/bin:$PATH"
