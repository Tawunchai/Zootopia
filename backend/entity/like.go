package entity

import"gorm.io/gorm"


type Like struct {
	gorm.Model
	UserID   uint  `gorm:"uniqueIndex:user_review_unique"`
	ReviewID *uint `gorm:"uniqueIndex:user_review_unique"`

	Review Review `gorm:"foreignKey:ReviewID"`
}