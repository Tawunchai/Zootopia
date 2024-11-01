package entity

import (
	"time"

	"gorm.io/gorm"
)

type Animal struct {
	gorm.Model
	Name string
	Description string
	Weight float64
	Height float64
	Birthplace string
	BirthDay    time.Time `json:"BirthDay" time_format:"2006-01-02"`
	Picture string
	Status string
	Note string

	// GenderID ทำหน้าที่เป็น FK
	GenderID uint
	Gender   Genders `gorm:"foreignKey:GenderID"`

	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`

	BehavioralID uint
	Behavioral   Behavioral `gorm:"foreignKey:BehavioralID"`

	BiologicalID uint
	Biological   Biologicals `gorm:"foreignKey:BiologicalID"`
}