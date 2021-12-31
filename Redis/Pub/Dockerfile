FROM golang:1.16-alpine

RUN apk update && apk add bash && apk add iputils

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /Pub

EXPOSE 8000

CMD [ "/Pub" ]