package bookControl

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	bookService "pranav/Controller/bookControl/services"
	valid "pranav/Controller/userControl/controller"
	book "pranav/Model/book"
	"strconv"

	"github.com/gorilla/mux"
)

type BookController struct {
	Ser bookService.BookService
}

func NewController(s bookService.BookService) *BookController {
	var new BookController
	new.Ser = s
	return &new
}

func (b *BookController) HandleReq(r *mux.Router) {
	// headersOk := handlers.AllowCredentials()
	// originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	// methodsOk := handlers.AllowedMethods([]string{"GET", "DELETE", "HEAD", "POST", "PUT", "OPTIONS"})
	// router := mux.NewRouter().StrictSlash(true)
	r.HandleFunc("/api/getallbooks", b.GetAll).Methods("GET")
	r.HandleFunc("/api/newbook", b.CreateNewBook).Methods("POST")
	r.HandleFunc("/api/updatebook/{id}", b.UpdateBook).Methods("PUT")
	r.HandleFunc("/api/deletebook/{id}", b.DeleteBook).Methods("DELETE")
	// router.HandleFunc("/updatestudent").Methods("PUT")
	// router.HandleFunc("/Delstudent").Methods("DELETE")
	// router.HandleFunc("/getstud").Methods("GET")

	//log.Fatal(http.ListenAndServe(":4200", handlers.CORS(originsOk, headersOk, methodsOk)(router)))

}

func (b *BookController) CreateNewBook(w http.ResponseWriter, r *http.Request) {
	if !valid.IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var newBook book.Book
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newBook)
	e := b.Ser.AddNewBook(newBook)

	if e == nil {
		w.WriteHeader(201)
		fmt.Fprintf(w, "Book added Sucessfully")
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}

func (b *BookController) GetAll(w http.ResponseWriter, r *http.Request) {

	temp, e := b.Ser.GetAllBooks()
	if e == nil {
		json.NewEncoder(w).Encode(temp)
		w.WriteHeader(200)
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}

func (b *BookController) UpdateBook(w http.ResponseWriter, r *http.Request) {
	if !valid.IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var newBook book.Book
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newBook)
	var params = mux.Vars(r)
	var temp string = params["id"]
	test, _ := strconv.Atoi(temp)

	e := b.Ser.UpdateBook(test, newBook)

	if e == nil {
		w.WriteHeader(201)
		fmt.Fprintf(w, "Book Updated Sucessfully")
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}

func (b *BookController) DeleteBook(w http.ResponseWriter, r *http.Request) {
	if !valid.IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var params = mux.Vars(r)
	var temp string = params["id"]
	test, _ := strconv.Atoi(temp)

	e := b.Ser.DeleteBook(test)

	if e == nil {
		w.WriteHeader(201)
		fmt.Fprintf(w, "Book Deleted Sucessfully")
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}
