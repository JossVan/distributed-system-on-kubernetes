FROM golang:alpine

WORKDIR /
COPY . .
RUN apk update && apk add iputils

RUN go mod download

EXPOSE 8000

CMD ["go", "run", "server.go"]