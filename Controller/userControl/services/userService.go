package userControl

import (
	"errors"
	"fmt"
	userBook "pranav/Model/book"
	user "pranav/Model/user"
	userBookData "pranav/Model/userBookData"

	"pranav/repository"
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type UserService struct {
	Db   *gorm.DB
	Repo repository.Repository
}

func NewService(db *gorm.DB, repo repository.Repository) *UserService {
	var new UserService
	new.Db = db
	new.Repo = repo
	return &new
}

func (s *UserService) AddUser(user1 user.User) error {
	var temp = true
	var usercheck user.User
	s.Db.First(&usercheck, "username=?", user1.Username)
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	user1.ID = uuid.New()
	user1.Active = &temp
	user1.Penalty = 0
	user1.CreatedAt = time.Now()
	fmt.Println(usercheck)
	if usercheck.Username == "" {
		m := s.Repo.Add(UnitOfWork, user1)
		if m != nil {
			UnitOfWork.Complete()
			return m
		}
		UnitOfWork.Commit()
	} else {
		return errors.New(`username already exist`)
	}

	return nil
}

func (s *UserService) ValidateUser(username, password string) bool {
	var User user.User
	m := s.Db.Debug().Where("username = ?", username).Preload("UserBooks").First(&User)
	if m.Error != nil {
		fmt.Println(m.Error)
		return false
	}
	if User.Password != password {
		return false
	}

	return true
}

func (s *UserService) GetUser(username string) (user.UserFrontend, error) {
	var User user.User
	var Userfront user.UserFrontend
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	// m := s.Repo.Get(UnitOfWork, &User, ID, []string{"UserBooks"})
	m := s.Db.Debug().Where("username = ?", username).Preload("UserBooks").First(&User)
	if m.Error != nil {
		fmt.Println("i got here")
		return Userfront, m.Error
	}
	Userfront.ID = User.ID
	Userfront.FirstName = User.FirstName
	Userfront.LastName = User.LastName
	Userfront.Email = User.Email
	Userfront.ContactNumber = User.ContactNumber
	Userfront.Penalty = User.Penalty
	Userfront.Usename = User.Username
	Userfront.JOiningDate = User.CreatedAt.String()
	Userfront.Booksids = make([]int, len(User.UserBooks))
	for i := 0; i < len(User.UserBooks); i++ {
		Userfront.Booksids[i] = User.UserBooks[i].BookID
	}
	UnitOfWork.Commit()
	return Userfront, nil
}

func (s *UserService) ReturnBook(username string, BookID int) error {
	var user1 user.User
	var book userBook.Book
	var booktodel userBookData.UserBookData
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	s.Db.Debug().Preload("UserBooks").First(&user1, "username = ?", username)

	m := s.Db.Unscoped().Where("uid = ? AND book_id = ?", user1.ID, BookID).Delete(&booktodel)
	if m.Error != nil {
		return m.Error
	}

	m = s.Db.Debug().First(&book, "id=?", BookID)
	fmt.Println(m.Error)
	fmt.Println("book count Before", book.Count)
	book.Count++
	fmt.Println("book count After", book.Count)
	s.Db.Save(book)
	UnitOfWork.Commit()
	return nil
}

func (s *UserService) AddNewUserBook(username string, id int) error {
	var user1 user.User
	var book1 userBook.Book
	var userbookdata1 userBookData.UserBookData
	var temp = false
	s.Db.Debug().Preload("UserBooks").First(&user1, "username = ?", username)
	if len(user1.UserBooks) > 4 {
		return errors.New("you can only take 5 books")
	}
	s.Db.Debug().First(&book1, "id=?", id)
	book1.Count--
	s.Db.Save(book1)
	fmt.Println(id)
	userbookdata1.BookID = id
	userbookdata1.UID = user1.ID
	userbookdata1.IsReturned = &temp
	userbookdata1.IssueDate = time.Now()
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	m := s.Repo.Add(UnitOfWork, userbookdata1)
	if m != nil {
		UnitOfWork.Complete()
		return m
	}
	UnitOfWork.Commit()
	return nil
}

func (s *UserService) UpdatePenalty() {

	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	var UserArr []user.User
	m := s.Repo.GetAll(UnitOfWork, &UserArr, []string{"UserBooks"})
	if m != nil {
		UnitOfWork.Complete()
		return
	}

	var ans = 0
	for i := 0; i < len(UserArr); i++ {
		var temp1 float64
		for j := 0; j < len(UserArr[i].UserBooks); j++ {
			firstate := UserArr[i].UserBooks[j].IssueDate
			seconddate := time.Now()
			datediff := seconddate.Sub(firstate)
			days := datediff.Hours() / 24
			fmt.Println(days)
			if days > 5 {

				temp1 = (days - 1) * 5
			}
			ans = UserArr[i].Penalty + int(temp1)

		}

		temp := UserArr[i]
		temp.Penalty = ans
		temp.UserBooks = nil
		ans = 0
		s.Db.Save(&temp)
	}
	time.AfterFunc(24*time.Hour, func() { s.UpdatePenalty() })
	//UnitOfWork.Commit()

}

func (s *UserService) Getall() ([]user.UserFrontend, error) {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	var UserArr []user.User

	//fmt.Println(UserArr)
	m := s.Repo.GetAll(UnitOfWork, &UserArr, []string{"UserBooks"})
	if m != nil {
		UnitOfWork.Complete()
		return nil, m
	}
	var Userfront []user.UserFrontend = make([]user.UserFrontend, len(UserArr))
	fmt.Println(UserArr)
	fmt.Println("The length of this Array is:", len(UserArr))
	for i := 0; i < len(UserArr); i++ {
		Userfront[i].ID = UserArr[i].ID
		Userfront[i].Usename = UserArr[i].Username
		Userfront[i].Penalty = UserArr[i].Penalty
		Userfront[i].JOiningDate = UserArr[i].CreatedAt.String()
		Userfront[i].FirstName = UserArr[i].FirstName
		Userfront[i].LastName = UserArr[i].LastName
		Userfront[i].Email = UserArr[i].Email
		Userfront[i].ContactNumber = UserArr[i].ContactNumber
		fmt.Println("Length of the userbook Array", len(UserArr[i].UserBooks))
		Userfront[i].Booksids = make([]int, len(UserArr[i].UserBooks))
		for j := 0; j < len(UserArr[i].UserBooks); j++ {
			Userfront[i].Booksids[j] = UserArr[i].UserBooks[j].BookID
		}
	}
	UnitOfWork.Commit()
	return Userfront, nil

}

func (s *UserService) DeleteUser(id uuid.UUID) error {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	var temp user.User
	var temp1 userBookData.UserBookData
	m := s.Repo.DeleteByID(UnitOfWork, &temp, id)
	s.Db.Unscoped().Where("uid LIKE ?", id).Delete(&temp1)
	if m != nil {
		return m
	}
	UnitOfWork.Commit()
	return nil
}

func (s *UserService) UpdateUser(id uuid.UUID, user1 user.User) error {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	m := s.Repo.UpdateSingle(UnitOfWork, user1, id)
	if m != nil {
		return m
	}
	UnitOfWork.Commit()
	return nil
}
