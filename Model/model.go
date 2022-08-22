package model

import (
	"time"

	"github.com/google/uuid"
)

type Model struct {
	ID        uuid.UUID  `gorm:"primarykey;type:Varchar(36)"`
	CreatedAt time.Time  `json:"createdat"`
	UpdatedAt time.Time  `json:"updatedat"`
	DeletedAt *time.Time `gorm:"index"`
}
