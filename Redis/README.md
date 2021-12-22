# PUB/SUB de Redis

Para la implementacion de la mensageria pub/sub se utilizo Redis como base de datos no sql

Para el servidor en golang se utilizaron las siguientes librerias

- Fiber: framework inspirado en Express para crear servidores web en golang

    ```go get github.com/gofiber/fiber/v2```

- go-redis: Libreria para utilizar redis en go

    ```go mod init <nombreModulo>```

    ```go mod tidy```

    ```go get github.com/go-redis/redis/v8```


Structura JSON que reciben

```JSON
{
    "name":"julio cifuentes",
    "location":"san marcos",
    "age":22,
    "vaccine_type":"Sputnik V",
    "n_dose":2
}
```


## Informacion de instacia de Redis

listaPersonas (list) : lista de strings que almacena la informacion de las personas

    lpush listaPersonas "string"
    lrange listaPersonas 0 -1


## Docker

Imagen distroless de go para minimizar el tamaño de la imagen

### Pub

Crear imagen

```docker build -t pub-redis:<tag> .```

Crear contenedor

```docker run -p 3000:3000 --name pub-redis-container -d pub-redis:v1```

Ver consola

```docker container logs -f <name>```

### Sub

Crear imagen

```docker build -t sub-redis:<tag> .```

Crear contenedor

```docker run --name sub-redis-container -d sub-redis:v1```