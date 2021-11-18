#!/bin/sh
# Ensure connect to postgres
python manage.py shell < docker_django/connect_check.py

python manage.py migrate
python manage.py makemigrations api_da4
python manage.py makemigrations auth_da4
python manage.py makemigrations quiz_da4
python manage.py migrate

python manage.py shell < docker_django/data_initialize.py

# dev
# python manage.py runserver 0.0.0.0:8000
# prod
python manage.py collectstatic  --noinput
gunicorn --bind :8000 dA_04.wsgi:application --reload
exec "$@"