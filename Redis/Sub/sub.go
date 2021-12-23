package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/go-redis/redis/v8"
	//"go.mongodb.org/mongo-driver/mongo"
	//"go.mongodb.org/mongo-driver/mongo/options"
)

// json que se recibe
type Person struct {
	Name         string `json:"name"`
	Location     string `json:"location"`
	Age          int    `json:"age"`
	Vaccine_type string `json:"vaccine_type"`
	N_dose       int    `json:"n_dose"`
}

var ctx = context.Background()

// localhost = "127.0.0.1"
// local redis container = "172.17.0.2"
const ip_address = "34.125.139.194"

var rdb = redis.NewClient(&redis.Options{
	Addr:     ip_address + ":6379",
	Password: "grupo16_vacas_2021",
	DB:       0, // use default DB
})

func setValues(person Person) {
	/* setear contador para rango de edades
	RANGOS
	rango1 -> ninos 0 - 11
	rango2 -> adolescentes 12 - 18
	rango3 -> jovenes 19 - 26
	rango3 -> adultos 27 - 59
	rango4 -> vejez >= 60
	*/
	var key = ""
	if person.Age >= 60 {
		key = "rango5"
	} else if person.Age < 60 && person.Age >= 27 {
		key = "rango4"
	} else if person.Age <= 26 && person.Age >= 19 {
		key = "rango3"
	} else if person.Age <= 18 && person.Age >= 12 {
		key = "rango2"
	} else {
		key = "rango1"
	}
	_, err := rdb.Incr(ctx, key).Result()
	if err != nil {
		log.Println("Error al aumentar contador ", key)
	}

	/*	utilizar una lista
		lpush lista <elemento>
		y para obtener los ultimos 5
		lrange lista 0 4
	*/
	data, _ := json.Marshal(person)
	_, err = rdb.LPush(ctx, "listaPersonas", data).Result()
	if err != nil {
		log.Println("Error al insertar informacion en la lista", err)
	}
}

// Insertando datos en mongodb
func insertIntoMongo() {
	fmt.Println("prueba")
}

func main() {
	fmt.Println("Iniciando Redis-Sub...")
	subscriber := rdb.Subscribe(ctx, "person-data")

	person := Person{}

	for {
		mensaje, err := subscriber.ReceiveMessage(ctx)
		if err != nil {
			log.Println("Error al recibir mensaje")
		}

		if err := json.Unmarshal([]byte(mensaje.Payload), &person); err != nil {
			log.Println("Error al convertir el struct a json")
		}
		// escribir en la base de datos los valores necesarios para los reportes
		setValues(person)
		// el struct que se recibe, se envia directamente a mongodb, como????

		fmt.Println("Mensaje recibido del canal " + mensaje.Channel)
		fmt.Printf("%+v\n\n", person)
	}
}
