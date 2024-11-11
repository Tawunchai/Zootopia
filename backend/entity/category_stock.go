package entity

import "gorm.io/gorm"

type CategoryStock struct {
	gorm.Model
	Name string

	Animals []Animal `gorm:"foreignKey:BehavioralID"`
}
