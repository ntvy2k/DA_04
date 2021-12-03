FROM thevydocker777/pre_java:1.0

LABEL side="complier"

COPY . /app

WORKDIR /app

EXPOSE 80

CMD ["uvicorn", "main:app", "--host" , "0.0.0.0", "--port", "80"]