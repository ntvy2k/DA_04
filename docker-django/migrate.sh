echo "Starting"

python manage.py migrate
python manage.py makemigrations
python manage.py migrate

echo 'Migrations: OK'

# dev
# python manage.py runserver 0.0.0.0:8000
# prod
# gunicorn --bind :8000 dA_04.wsgi:application