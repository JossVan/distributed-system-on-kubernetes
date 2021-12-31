package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"
	"github.com/gorilla/mux"
)

// ------------------------------------

type Post struct {
	Name         string      `json:"name"`
	Location     string      `json:"location"`
	Age          json.Number `json:"age"`
	Vaccine_type string      `json:"vaccine_type"`
	n_dose       string      `json:"n_dose"`
}

func publishJSON(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var post Post

	_ = json.NewDecoder(r.Body).Decode(&post)

	// ---------------------------------------------------------------------------

	data := `{ "name": "` + post.Name + `",
	"location": "` + post.Location + `",
	"age": "` + string(post.Age) + `",
	"vaccine_type": "` + post.Vaccine_type + `",
	"n_dose": "` + post.n_dose + `"}`

	fmt.Println(data)

	url1 := "grpcclient-service:8000"			//gRPC
	url2 := "redis-pub-service:3000/pub"		//Redis
	url := ""								//Defecto

	rand.Seed(time.Now().UnixNano())
	min := 1
	max := 2
	random := rand.Intn(max-min+1) + min

	fmt.Println(random)

	if random == 1 { //Envio a gRPC
		url = url1
		fmt.Println("gRPC")
	} else if random == 2 { // Envio a Redis
		url = url2
		fmt.Println("Redis")
	} 

	var jsonStr = []byte(data)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

	_ = json.NewDecoder(r.Body).Decode(&body)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage API Dummy")
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/publish", publishJSON).Methods("POST")
	log.Fatal(http.ListenAndServe(":8200", myRouter))
}

func main() {
	handleRequests()
}
