package userControl

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	userService "pranav/Controller/userControl/services"
	User "pranav/Model/user"
	userBook "pranav/Model/userBookData"
	"time"

	"github.com/dgrijalva/jwt-go"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

var JwtKey = []byte("a1f9bac8227e4f939518f1ed5fa16b34")

type UserCred struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var Admins = map[string]string{
	"Admin1": "Password1",
	"Admin2": "Password2",
	"Admin3": "Password3",
}

type Claims struct {
	Username  string `json:"username"`
	Authority string `json:"authority"`
	jwt.StandardClaims
}

type LOGINAUTH struct {
	Username     string `json:"username"`
	Authority    string `json:"authority"`
	ActiveStatus bool   `json:"activestatus"`
}

type UserController struct {
	Ser userService.UserService
}

func NewController(s userService.UserService) *UserController {
	var new UserController
	new.Ser = s
	return &new
}

func (c *UserController) HandleReq(r *mux.Router) {
	r.HandleFunc("/api/login", c.Login).Methods("POST")
	r.HandleFunc("/api/getallusers", c.GetExistingUsers).Methods("GET")
	r.HandleFunc("/api/newuser", c.CreateUserDb).Methods("POST")
	r.HandleFunc("/api/user/newbook/{username}", c.NewUserBook).Methods("POST")
	r.HandleFunc("/api/Updateuser/{id}", c.UpdateUser).Methods("PUT")
	r.HandleFunc("/api/Deleteuser/{id}", c.DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/logout", c.Logout).Methods("POST")
	r.HandleFunc("/api/user/getuser/{username}", c.Getuser).Methods("POST")
	r.HandleFunc("/api/user/returnbook/{username}", c.ReturnBook).Methods("POST")
	r.HandleFunc("/api/user/login", c.LoginforUser).Methods("POST")
	r.HandleFunc("/api/user/logout", c.UserLogout).Methods("POST")

}

func (c *UserController) Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login  got executed")
	var Custforlogin UserCred
	var Authtoken LOGINAUTH
	_ = json.NewDecoder(r.Body).Decode(&Custforlogin)
	password := Custforlogin.Password
	Username := Custforlogin.Username
	expectedpassword, ok := Admins[Username]
	Authtoken.Username = Username

	if !ok || expectedpassword != password {
		w.WriteHeader(400)
		fmt.Fprintf(w, "Username or Password is wrong")
		return
	}

	Authtoken.Authority = "Admin"

	expirationTime := time.Now().Add(time.Minute * 20)
	Authtoken.ActiveStatus = true
	claims := &Claims{

		Username:  Username,
		Authority: "Admin",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
	w.Header().Set("Username:", Custforlogin.Username)
	json.NewEncoder(w).Encode(tokenString)
	w.WriteHeader(200)
	// fmt.Fprintf(w, `Login Successful`)
}

func (c *UserController) LoginforUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login for user got executed")
	var Custforlogin UserCred
	var Authtoken LOGINAUTH
	_ = json.NewDecoder(r.Body).Decode(&Custforlogin)
	password := Custforlogin.Password
	Username := Custforlogin.Username
	// expectedpassword, ok := Admins[Username]
	Authtoken.Username = Username

	if !(c.Ser.ValidateUser(Username, password)) {
		w.WriteHeader(400)
		fmt.Fprintf(w, "Username or Password is wrong")
		return
	}

	Authtoken.Authority = "User"

	expirationTime := time.Now().Add(time.Minute * 20)
	Authtoken.ActiveStatus = true
	claims := &Claims{

		Username:  Username,
		Authority: "User",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
	w.Header().Set("Username:", Custforlogin.Username)
	json.NewEncoder(w).Encode(tokenString)
	w.WriteHeader(200)
	// fmt.Fprintf(w, `Login Successful`)
}

func (c *UserController) Getuser(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockieUser(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var newuserbook userBook.UserInput
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newuserbook)

	User, err := c.Ser.GetUser(newuserbook.Username)
	if err != nil {
		w.WriteHeader(400)
		fmt.Fprintf(w, err.Error())
	}

	json.NewEncoder(w).Encode(User)
	w.WriteHeader(200)
}

func (c *UserController) CreateUserDb(w http.ResponseWriter, r *http.Request) {

	var newUser User.User
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newUser)
	e := c.Ser.AddUser(newUser)

	if e == nil {
		w.WriteHeader(200)
		fmt.Fprintf(w, `user added Sucessfully`)
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}

func (c *UserController) NewUserBook(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockieUser(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}

	var newuserbook userBook.UserInput
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newuserbook)
	//fmt.Println("fucking shit why is this not getting printed", newuserbook)
	e := c.Ser.AddNewUserBook(newuserbook.Username, newuserbook.BookId)
	if e == nil {
		w.WriteHeader(201)
		fmt.Fprintf(w, "Book added Sucessfully")
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())
}

func (c *UserController) ReturnBook(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockieUser(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var newuserbook userBook.UserInput
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newuserbook)

	e := c.Ser.ReturnBook(newuserbook.Username, newuserbook.BookId)
	if e == nil {
		w.WriteHeader(201)
		fmt.Fprintf(w, "Book Returned Sucessfully")
		return
	}
	w.WriteHeader(400)
	fmt.Fprintf(w, e.Error())

}

func (c *UserController) GetExistingUsers(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}

	UserArr, e := c.Ser.Getall()

	if e != nil {
		w.WriteHeader(400)
		fmt.Fprintf(w, e.Error())
	}

	json.NewEncoder(w).Encode(UserArr)
	w.WriteHeader(200)
}

func (C *UserController) DeleteUser(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var params = mux.Vars(r)
	var temp string = params["id"]
	test, _ := uuid.Parse(temp)
	e := C.Ser.DeleteUser(test)
	if e != nil {
		w.WriteHeader(400)
		fmt.Fprintf(w, e.Error())
	}
	w.WriteHeader(201)
	fmt.Fprintf(w, "User Deleted Sucessfully")

}

func (C *UserController) UpdateUser(w http.ResponseWriter, r *http.Request) {
	if !IsValidCoockie(w, r) {
		w.WriteHeader(502)
		fmt.Fprintf(w, "Please Login Again")
		return
	}
	var params = mux.Vars(r)
	var temp string = params["id"]
	test, _ := uuid.Parse(temp)
	var newUser User.User
	readbody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(readbody, &newUser)
	e := C.Ser.UpdateUser(test, newUser)
	if e != nil {
		w.WriteHeader(400)
		fmt.Fprintf(w, e.Error())
	}
	w.WriteHeader(201)
	fmt.Fprintf(w, "User Upadated Sucessfully")

}

func IsValidCoockie(w http.ResponseWriter, r *http.Request) bool {
	tokenStr := r.Header.Get("token")
	fmt.Println("I'm the header value bruh", tokenStr)
	// tokenStr := cookie.Value
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
		return JwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			fmt.Println("IDK Why but this  has invalid signature")
			w.WriteHeader(http.StatusUnauthorized)
			return false
		}
		w.WriteHeader(http.StatusBadRequest)
		return false
	}
	if !tkn.Valid {
		fmt.Println("IDK Why but this  has invalid token")
		w.WriteHeader(http.StatusUnauthorized)
		return false
	}

	if claims.Authority != "Admin" {
		fmt.Println("IDK Why but this  says Authority != Admin")
		fmt.Println(claims.Authority)
		w.WriteHeader(http.StatusUnauthorized)
		return false
	}

	return true
}

func IsValidCoockieUser(w http.ResponseWriter, r *http.Request) bool {
	tokenStr := r.Header.Get("token")
	fmt.Println("I'm the header value bruh", tokenStr)
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
		return JwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			fmt.Println("IDK Why but this  has invalid signature")
			w.WriteHeader(http.StatusUnauthorized)
			return false
		}
		w.WriteHeader(http.StatusBadRequest)
		return false
	}
	if !tkn.Valid {
		fmt.Println("IDK Why but this  has invalid token")
		w.WriteHeader(http.StatusUnauthorized)
		return false
	}

	if claims.Authority != "User" {
		fmt.Println("IDK Why but this  says Authority != User")
		fmt.Println(claims.Authority)
		w.WriteHeader(http.StatusUnauthorized)
		return false
	}

	return true
}

func (C *UserController) Logout(w http.ResponseWriter, r *http.Request) {

	http.SetCookie(w, &http.Cookie{
		Name: "token",

		Expires: time.Now(),
	})
}

func (C *UserController) UserLogout(w http.ResponseWriter, r *http.Request) {

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Expires: time.Now(),
	})
}
