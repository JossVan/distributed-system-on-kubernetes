FROM golang:alpine

WORKDIR /

COPY . .

RUN apk update && apk add iputils

RUN go mod download

EXPOSE 50051

CMD ["go", "run", "server.go"]