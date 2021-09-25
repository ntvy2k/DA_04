FROM alpine:latest

LABEL Side="frontend"

RUN apk add --update nodejs npm curl

COPY . /code

WORKDIR /code

RUN npm install && npm cache clean --force

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]