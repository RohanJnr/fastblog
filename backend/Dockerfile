FROM python:3.11-slim-buster

ENV POETRY_VIRTUALENVS_CREATE=false
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install -U poetry

WORKDIR /app

COPY backend/pyproject.toml backend/poetry.lock ./
RUN poetry install --no-dev

EXPOSE 8000

COPY ./backend .