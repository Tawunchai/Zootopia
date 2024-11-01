package entity

import (
	"time"

	"gorm.io/gorm"
)

type Animal struct {
	gorm.Model
	Name string
	Description string
	BirthDay    time.Time `json:"BirthDay" time_format:"2006-01-02"`

	// GenderID ทำหน้าที่เป็น FK
	GenderID uint
	Gender   Gender `gorm:"foreignKey:GenderID"`

	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`

	BehavioralID uint
	Behavioral   Behavioral `gorm:"foreignKey:BehavioralID"`
}