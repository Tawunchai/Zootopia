package entity

import "gorm.io/gorm"

type Gender struct {
	gorm.Model
	Name string

	Animals []Animal `gorm:"foreignKey:GenderID"`
}
