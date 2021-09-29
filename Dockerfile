FROM python:3.9.7

LABEL Side="backend"

COPY . /code

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install -r requirements.txt

RUN chmod +x docker-django/migrate.sh

# auto migrations
CMD ["sh", "docker-django/migrate.sh"]