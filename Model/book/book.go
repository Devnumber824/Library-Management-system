package model

type Book struct {
	ID         int    `json:"id"`
	BookName   string `json:"bookname"`
	BookAuthor string `json:"bookauthor"`
	Count      int    `json:"count"`
}

func CreateNewBook(id, count int, bname, bauth string) *Book {
	var newbook Book
	newbook.ID = id
	newbook.BookName = bname
	newbook.BookAuthor = bauth
	newbook.Count = count
	return &newbook
}
