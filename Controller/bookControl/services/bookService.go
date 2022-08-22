package bookControl

import (
	book "pranav/Model/book"
	"pranav/repository"

	"github.com/jinzhu/gorm"
)

type BookService struct {
	Db   *gorm.DB
	Repo repository.Repository
}

func NewService(db *gorm.DB, repo repository.Repository) *BookService {
	var new BookService
	new.Db = db
	new.Repo = repo
	return &new
}

func (s *BookService) AddNewBook(b1 book.Book) error {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	m := s.Repo.Add(UnitOfWork, b1)
	if m != nil {
		UnitOfWork.Complete()
		return m
	}
	UnitOfWork.Commit()
	return nil
}

func (s *BookService) GetAllBooks() ([]book.Book, error) {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	var Books []book.Book
	m := s.Repo.GetAll(UnitOfWork, &Books, []string{})
	if m != nil {
		UnitOfWork.Complete()
		return nil, m
	}
	UnitOfWork.Commit()
	return Books, nil
}

func (s *BookService) UpdateBook(id int, b1 book.Book) error {
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	//m := s.Repo.UpdateSingle(UnitOfWork, &b1, id)
	e := s.Db.Debug().Model(&b1).Where("id = ?", id).Update(&b1).Error
	if e != nil {
		UnitOfWork.Complete()
		return e
	}
	UnitOfWork.Commit()
	return nil
}

func (s *BookService) DeleteBook(id int) error {
	var temp book.Book
	UnitOfWork := repository.NewUnitOfWork(s.Db, false)
	m := s.Db.Unscoped().Where("id=?", id).Delete(&temp)
	if m != nil {

		UnitOfWork.Complete()
		return m.Error
	}
	UnitOfWork.Commit()
	return nil
}
