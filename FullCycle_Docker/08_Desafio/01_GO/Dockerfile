# BUILD
FROM golang:1.19 AS build-stage

WORKDIR /app

RUN go mod init joabealexandre/fullcyclerocks
COPY main.go ./

RUN go build -o fullcyclerocks .

# RUN
FROM scratch

WORKDIR /
COPY --from=build-stage /app/fullcyclerocks /fullcyclerocks

CMD ["./fullcyclerocks"]