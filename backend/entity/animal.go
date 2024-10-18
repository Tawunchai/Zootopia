package entity

import (
	"time"

	"gorm.io/gorm"
)

type Animal struct {
	gorm.Model
	Name string
	Description string
	BirthDay  time.Time

	// GenderID ทำหน้าที่เป็น FK
	GenderID uint
	Gender   Gender `gorm:"foreignKey:GenderID"`

	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`

	BehavioralID uint
	Behavioral   Behavioral `gorm:"foreignKey:BehavioralID"`
}