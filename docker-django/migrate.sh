#!/bin/sh
# Ensure connect to postgres
python manage.py shell < docker-django/connect_check.py

python manage.py migrate
python manage.py makemigrations api_da4
python manage.py migrate
python manage.py makemigrations auth_da4
python manage.py migrate

echo 'Migrations: OK'


echo "Run server"
# dev
python manage.py runserver 0.0.0.0:8000
# prod
# gunicorn --bind :8000 dA_04.wsgi:application
exec "$@"