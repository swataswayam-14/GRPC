package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Todo struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}

func getTodos() ([]Todo, error) {
	response, err := http.Get("https://sum-server.100xdevs.com/todos")
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)

	if err != nil {
		return nil, err
	}

	var todos struct {
		Todos []Todo `json:"todos"`
	}

	if err := json.Unmarshal(body, &todos); err != nil {
		return nil, err
	}
	return todos.Todos, nil
}

func main() {
	todos, err := getTodos()

	if err != nil {
		fmt.Println(err)
		return
	}
	for _, todo := range todos {
		fmt.Printf("ID: %d, Title: %s, Description: %s, Completed: %t\n", todo.ID, todo.Title, todo.Description, todo.Completed)
	}
}
