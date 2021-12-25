# PUB/SUB de Redis

Para la implementacion de la mensageria pub/sub se utilizo Redis como base de datos no sql

Para el servidor en golang se utilizaron las siguientes librerias

- Primero inicializar el modulo de la aplicacion

    ```go mod init <nombreModulo>```

    ```go mod tidy```

- Fiber: framework inspirado en Express para crear servidores web en golang

    ```go get github.com/gofiber/fiber/v2```

- go-redis: Libreria para utilizar redis en go

    ```go get github.com/go-redis/redis/v8```

- go-mongodb: libreria para utilizar mongo db en go

    ```go get go.mongodb.org/mongo-driver/mongo```


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


sudo docker run -d -p 6379:6379 -v ~/redis:/usr/local/etc/redis --name bds_redisdb_1 redis:latest redis-server /usr/local/etc/redis/redis.conf

sudo docker exec -it redis sh
redis-cli -h 127.0.0.1 -p 6379 -a grupo16_vacas_2021

## Docker

Imagen distroless de go para minimizar el tamaño de la imagen

### Pub

Crear imagen

```docker build -t redis-pub:<tag> .```

Crear contenedor

```docker run -p 3000:3000 --name pub-redis-container -d pub-redis:v1```

Ver consola

```docker container logs -f <name>```

### Sub

Crear imagen

```docker build -t sub-redis:<tag> .```

Crear contenedor

```docker run --name sub-redis-container -d sub-redis:v1```

## VM de Google

### Redis

Para crear una instancia de redis con autenticacion se siguieron los siguientes pasos

Crear archivo de configuracion:

```
mkdir redis
cd redis
touch redis.conf
nano redis.conf
```

Contenido del archivo redis.conf

```
bind 0.0.0.0
requirepass grupo16_vacas_2021
```

Levantar contenedor:

```
sudo docker run -d -p 6379:6379 -v ~/redis:/usr/local/etc/redis --name bds_redisdb_1 redis:latest redis-server /usr/local/etc/redis/redis.conf
```

Entrar a la consola:

```
sudo docker exec -it bds_redisdb_1 sh
redis-cli -h 127.0.0.1 -p 6379 -a grupo16_vacas_2021
```

### MongoDB

Levantar el contenedor de mongo con contrasena

```
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=grupo16 -e MONGO_INITDB_ROOT_PASSWORD=grupo16_vacas_2021 --name mongodb mongo:latest
```

Entrar al contenedor de mongodb

```
sudo docker exec -it mongodb bash
mongo mongodb://grupo16:grupo16_vacas_2021@localhost:27017
```