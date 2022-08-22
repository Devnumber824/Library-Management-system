package model

import (
	"time"

	"github.com/google/uuid"
)

type UserBookData struct {
	UID        uuid.UUID `gorm:"primarykey;type:Varchar(36)" json:"uid"`
	BookID     int       `json:"bookid"`
	IsReturned *bool     `json:"isreturned"`
	IssueDate  time.Time `json:"issuedate"`
	ReturnDate time.Time `json:"returndate"`
}

type UserInput struct {
	Username string `json:"username"`
	BookId   int    `json:"bookid"`
}

func CreateNewUserBookData(bookid int) *UserBookData {
	var temp = false
	var newuser UserBookData
	newuser.BookID = bookid
	newuser.IsReturned = &temp
	newuser.IssueDate = time.Now()
	return &newuser
}

type UserbookdataFrontend struct {
	Username   string `json:"username"`
	Bookid     int    `json:"bookid"`
	Bookname   string `json:"bookname"`
	BookAuthor string `json:"bookauthor"`
}
