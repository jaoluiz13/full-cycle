#Gera os binarios
FROM golang:1.22 AS build

WORKDIR /app

COPY hello-world-docker.go .

RUN CGO_ENABLED=0 GOOS=linux go build -o hello-world-docker hello-world-docker.go

FROM scratch

#COPIA APENAS O BINARIO PARA O WORKSPACE QUE SERA EXECUTADO
WORKDIR /app

COPY --from=build /app/hello-world-docker /hello-world-docker

ENTRYPOINT ["/hello-world-docker"]