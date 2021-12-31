FROM golang:alpine

WORKDIR /
COPY . .
RUN apk update && apk add iputils && apk add bash

RUN go mod download

EXPOSE 8000

CMD ["go", "run", "client.go"]