FROM alpine:latest

LABEL Side="frontend"

RUN apk add --update nodejs npm curl

COPY . /front_side

WORKDIR /front_side

RUN npm install && npm cache clean --force

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]