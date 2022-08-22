package repository

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type Repository interface {
	Get(uow *UnitOfWork, out interface{}, id uuid.UUID, preloadAssociations []string) error
	GetAll(uow *UnitOfWork, out interface{}, preloadAssociations []string) error
	GetAllForTenant(uow *UnitOfWork, out interface{}, tenantID uuid.UUID, preloadAssociations []string) error
	Add(uow *UnitOfWork, out interface{}) error
	UpdateSingle(uow *UnitOfWork, out interface{}, id uuid.UUID) error

	Update(uow *UnitOfWork, out interface{}) error
	Save(uow *UnitOfWork, out interface{}) error

	Delete(uow *UnitOfWork, out interface{}) error
	DeleteByID(uow *UnitOfWork, out interface{}, studID uuid.UUID) error
	DeleteRemaining(uow *UnitOfWork, out interface{}, studID uuid.UUID, id []uuid.UUID) error
}

// UnitOfWork represents a connection
type UnitOfWork struct {
	DB        *gorm.DB
	committed bool
	readOnly  bool
}

// NewUnitOfWork creates new UnitOfWork
func NewUnitOfWork(db *gorm.DB, readOnly bool) *UnitOfWork {
	if readOnly {
		return &UnitOfWork{DB: db.New(), committed: false, readOnly: true}
	}
	return &UnitOfWork{DB: db.New().Begin(), committed: false, readOnly: false}
}

// Complete marks end of unit of work
func (uow *UnitOfWork) Complete() {
	if !uow.committed && !uow.readOnly {
		uow.DB.Rollback()
	}
}

// Commit the transaction
func (uow *UnitOfWork) Commit() {
	if !uow.readOnly {
		uow.DB.Commit()
	}
	uow.committed = true
}

// GormRepository implements Repository
type GormRepository struct {
}

// NewRepository returns a new repository object
func NewRepository() Repository {
	return &GormRepository{}
}

// Get a record for specified entity with specific id
func (repository *GormRepository) Get(uow *UnitOfWork, out interface{}, id uuid.UUID, preloadAssociations []string) error {
	db := uow.DB
	for _, association := range preloadAssociations {
		db = db.Preload(association)
	}
	return db.Debug().First(out, "id = ?", id).Error
}

// GetAll retrieves all the records for a specified entity and returns it
func (repository *GormRepository) GetAll(uow *UnitOfWork, out interface{}, preloadAssociations []string) error {
	db := uow.DB
	for _, association := range preloadAssociations {
		db = db.Preload(association)
	}
	return db.Debug().Find(out).Error
}

// GetAllForTenant returns all objects of specifeid tenantID
func (repository *GormRepository) GetAllForTenant(uow *UnitOfWork, out interface{}, tenantID uuid.UUID, preloadAssociations []string) error {
	db := uow.DB
	for _, association := range preloadAssociations {
		db = db.Preload(association)
	}
	return db.Where("tenantID = ?", tenantID).Find(out).Error
}

// Add specified Entity
func (repository *GormRepository) Add(uow *UnitOfWork, entity interface{}) error {
	return uow.DB.Debug().Create(entity).Error
}

//Update single Entity
func (repository *GormRepository) UpdateSingle(uow *UnitOfWork, entity interface{}, id uuid.UUID) error {
	return uow.DB.Debug().Model(entity).Where("id = ?", id).Update(entity).Error
}

// Update specified Entity
func (repository *GormRepository) Update(uow *UnitOfWork, entity interface{}) error {
	return uow.DB.Debug().Model(entity).Update(entity).Error
}

// Update specified Entity
func (repository *GormRepository) Save(uow *UnitOfWork, entity interface{}) error {
	return uow.DB.Debug().Model(entity).Save(entity).Error
}

// Delete specified Entity
func (repository *GormRepository) Delete(uow *UnitOfWork, entity interface{}) error {
	return uow.DB.Debug().Delete(entity).Error
}

//Soft Delete
func (repository *GormRepository) DeleteByID(uow *UnitOfWork, entity interface{}, studID uuid.UUID) error {
	return uow.DB.Debug().Where("id = ?", studID).Delete(entity).Error
}

func (repository *GormRepository) DeleteRemaining(uow *UnitOfWork, entity interface{}, studID uuid.UUID, id []uuid.UUID) error {
	fmt.Println(id)
	return uow.DB.Debug().Where("student_id = ? AND id NOT IN (?)", studID, id).Delete(entity).Error
}
