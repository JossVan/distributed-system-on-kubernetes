FROM golang:latest

WORKDIR /
COPY . .

RUN go mod download

EXPOSE 8200

CMD ["go", "run", "main.go"]