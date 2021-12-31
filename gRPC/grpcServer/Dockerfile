FROM golang:latest as build-env

WORKDIR /go/src/app

COPY . .

RUN go mod download

RUN apt-get update && apt-get install -y iputils-ping

RUN CGO_ENABLED=0 go build -o /go/bin/app

FROM gcr.io/distroless/static

EXPOSE 50051

COPY --from=build-env /go/bin/app /
CMD ["/app"]