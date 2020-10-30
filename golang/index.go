package main

import (
    "fmt"
    "net/http"
    "encoding/json"
)

func getHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        q := r.URL.Query()
    fmt.Println(q)
    fmt.Println("get_checkbox[]: ", q["get_checkbox[]"])
    fmt.Println("get_checkbox: ", q["get_checkbox"])
    fmt.Println("get_text: ", q["get_text"])

    jsonData, err := json.Marshal(q)
    if err != nil {
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
    }
}

func postHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        r.ParseForm()
        fmt.Println("post_checkbox[]", r.Form["post_checkbox[]"])
        fmt.Println("post_checkbox", r.Form["post_checkbox"])
        fmt.Println("post_text", r.Form["post_text"])

        jsonData, err := json.Marshal(r.Form)
        if err != nil {
        }
        w.Header().Set("Content-Type", "application/json")
        w.Write(jsonData)
    }
}

func main() {
    fmt.Println("http://localhost:8080")
    http.Handle("/", http.FileServer(http.Dir("./")))
    http.HandleFunc("/get", getHandler)
    http.HandleFunc("/post", postHandler)
    http.ListenAndServe(":8080", nil)
}
