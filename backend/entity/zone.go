package entity

import "gorm.io/gorm"

type Zone struct {
	gorm.Model
	Zone string
	Description string
	Price float64
	Picture string

	Habitats []Habitat `gorm:"foreignKey:ZoneID"`

	Event []Event `gorm:"foreignKey:ZoneID"`
}
