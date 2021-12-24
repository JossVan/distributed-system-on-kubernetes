package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	pb "servergrpc/proto-grpc"
	"time"

	"github.com/go-redis/redis"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// localhost = "127.0.0.1"
// local redis container = "172.17.0.2"
const ip_address = "34.125.139.194"

var rdb = redis.NewClient(&redis.Options{
	Addr:     ip_address + ":6379",
	Password: "",
	DB:       0, // use default DB
})

func setValues(person string) {
	/* setear contador para rango de edades
	RANGOS
	rango1 -> ninos 0 - 11
	rango2 -> adolescentes 12 - 18
	rango3 -> jovenes 19 - 26
	rango3 -> adultos 27 - 59
	rango4 -> vejez >= 60
	*/
	persona := personas{}

	if err := json.Unmarshal([]byte(person), &persona); err != nil {
		log.Println("Error al convertir el struct a json")
	}
	var key = ""
	if persona.Age >= 60 {
		key = "rango5"
	} else if persona.Age < 60 && persona.Age >= 27 {
		key = "rango4"
	} else if persona.Age <= 26 && persona.Age >= 19 {
		key = "rango3"
	} else if persona.Age <= 18 && persona.Age >= 12 {
		key = "rango2"
	} else {
		key = "rango1"
	}
	_, err := rdb.Incr(key).Result()
	if err != nil {
		log.Println("Error al aumentar contador ", key)
	}

	/*	utilizar una lista
		lpush lista <elemento>
		y para obtener los ultimos 5
		lrange lista 0 4
	*/
	data, _ := json.Marshal(person)
	_, err = rdb.LPush("listaPersonas", data).Result()
	if err != nil {
		log.Println("Error al insertar informacion en la lista", err)
	}
}

type personas struct {
	Name         string `json:"name"`
	Location     string `json:"location"`
	Age          int    `json:"age"`
	Vaccine_type string `json:"vaccine_type"`
	N_dose       int    `json:"n_dose"`
}

type server struct {
	pb.UnimplementedGetInfoServer
}

func almacenar_persona(personas string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoclient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://grupo16:grupo16_vacas_2021@34.125.139.194:27017/registro?authSource=admin")) //Aqui va el link de la db de mongo
	if err != nil {
		log.Fatal(err)
	}

	databases, err := mongoclient.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(databases)

	Database := mongoclient.Database("registro")
	Collection := Database.Collection("personas")

	var bdoc interface{}

	errb := bson.UnmarshalExtJSON([]byte(personas), true, &bdoc)
	fmt.Println(errb)

	insertResult, err := Collection.InsertOne(ctx, bdoc)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(insertResult)
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	almacenar_persona(in.GetId())
	setValues(in.GetId())
	fmt.Printf(">> Data recida: %v\n", in.GetId())
	return &pb.ReplyInfo{Info: ">> persona: " + in.GetId()}, nil
}

func main() {
	escucha, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Fallo al levantar el servidor: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})
	if err := s.Serve(escucha); err != nil {
		log.Fatalf("Fallo al levantar el servidor: %v", err)
	}
}
