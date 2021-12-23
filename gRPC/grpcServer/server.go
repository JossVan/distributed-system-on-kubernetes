package main

import (
	"context"
	"fmt"
	"log"
	"net"
	pb "servergrpc/proto-grpc"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type personas struct {
	name         string `json:"name"`
	location     string `json:"location"`
	age          int    `json:"age"`
	vaccine_type string `json:"vaccine_type"`
	n_dose       int    `json:"n_dose"`
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
