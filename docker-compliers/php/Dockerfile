FROM thevydocker777/pre_php_complier:1.0

COPY . /app

WORKDIR /app

EXPOSE 80

CMD ["uvicorn", "main:app", "--host" , "0.0.0.0", "--port", "80"]