echo "Process"

python manage.py migrate
python manage.py makemigrations
python manage.py migrate

echo 'migrate: OK'

echo "Run server"
python manage.py runserver 0.0.0.0:8000