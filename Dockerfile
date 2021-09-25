FROM alpine:latest

LABEL Side="backend"

COPY . /code

WORKDIR /code

CMD ["bin/ls", "-l"]