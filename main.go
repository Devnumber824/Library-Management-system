package main

import (
	"fmt"
	bookControl "pranav/Controller/bookControl/controller"
	bookService "pranav/Controller/bookControl/services"
	userControl "pranav/Controller/userControl/controller"
	userService "pranav/Controller/userControl/services"
	book "pranav/Model/book"
	user "pranav/Model/user"
	userbookdata "pranav/Model/userBookData"
	"pranav/repository"
	"time"

	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func main() {
	Repo := repository.NewRepository()
	Db, err := gorm.Open("mysql", "root:root@tcp(127.0.0.1:3306)/library?charset=utf8&parseTime=True")
	if err != nil {
		fmt.Println(err)
		panic("failed to connect database")
	}
	var UserService = userService.NewService(Db, Repo)
	var UserController = userControl.NewController(*UserService)
	var BookService = bookService.NewService(Db, Repo)
	var BookController = bookControl.NewController(*BookService)

	UserController.Ser.Db.AutoMigrate(&user.User{})
	BookController.Ser.Db.AutoMigrate(&book.Book{})
	UserController.Ser.Db.AutoMigrate(&userbookdata.UserBookData{})

	tp := UserController.Ser.Db.Debug().Model(&userbookdata.UserBookData{}).AddForeignKey("uid", "users(id)", "CASCADE", "CASCADE")
	fmt.Println(tp.Error)

	time.AfterFunc(5*time.Second, func() { UserService.UpdatePenalty() })
	//routing
	headersOk := handlers.AllowCredentials()
	//originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	originsOk := handlers.AllowedOrigins([]string{"*", "Access-Control-Allow-Origin"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "DELETE", "HEAD", "POST", "PUT", "OPTIONS"})
	headok := handlers.AllowedHeaders([]string{"Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type",
		"Accept", "x-client-key", "x-client-token", "x-client-secret", "Authorization", "token", "Access-Control-Allow-Origin"})
	router := mux.NewRouter().StrictSlash(true)
	UserController.HandleReq(router)
	BookController.HandleReq(router)
	log.Fatal(http.ListenAndServe(":3080", handlers.CORS(originsOk, headersOk, methodsOk, headok)(router)))

}
