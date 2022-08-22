package model

import (
	model "pranav/Model"
	modeluserBookData "pranav/Model/userBookData"

	"github.com/google/uuid"
)

type User struct {
	model.Model
	Username      string                           `json:"username"`
	Password      string                           `json:"password"`
	UserBooks     []modeluserBookData.UserBookData `gorm:"foreignKey:uid" json:"userbooks"`
	Penalty       int                              `json:"penalty"`
	Active        *bool                            `json:"active"`
	FirstName     string                           `json:"firstname"`
	LastName      string                           `json:"lastname"`
	Email         string                           `json:"email"`
	ContactNumber string                           `json:"contactnumber"`
}

func CreateNewUser(username, Password string) *User {
	var test User
	var temp1 = true
	temp := uuid.New()
	test.Username = username
	test.Password = Password
	test.Active = &temp1
	test.Penalty = 0
	test.ID = temp
	return &test
}

type UserFrontend struct {
	Usename       string    `json:"username"`
	ID            uuid.UUID `json:"id"`
	Booksids      []int     `json:"bookids"`
	Penalty       int       `json:"penalty"`
	JOiningDate   string    `json:"joiningdate"`
	FirstName     string    `json:"firstname"`
	LastName      string    `json:"lastname"`
	Email         string    `json:"email"`
	ContactNumber string    `json:"contactnumber"`
}
