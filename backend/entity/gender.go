package entity

import "gorm.io/gorm"

type Genders struct {
	gorm.Model
	Gender string

	Animals []Animal `gorm:"foreignKey:GenderID"`

	Users []Users `gorm:"foreignKey:GenderID"`
}
