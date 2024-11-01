package entity

import "gorm.io/gorm"

type Biologicals struct {
	gorm.Model
	Biological string

	Animals []Animal `gorm:"foreignKey:BiologicalID"`
}
