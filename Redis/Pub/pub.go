package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

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
	DB:       0, // use default DB,
})

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Servidor Pub de Redis")
	})

	// publication message
	app.Post("/pub", func(c *fiber.Ctx) error {
		person := new(Person)

		if err := c.BodyParser(person); err != nil {
			log.Println("Json no soportado, verifique su estructura")
			c.SendStatus(404)
		}

		info, err := json.Marshal(person)
		if err != nil {
			log.Println(err)
			c.SendStatus(404)
		}

		if err := rdb.Publish(ctx, "person-data", info).Err(); err != nil {
			return c.SendStatus(404)
		}

		// luego de enviar el pub, insertar la informacion en una lista

		return c.SendStatus(200)
	})

	app.Listen(":3000")
}
