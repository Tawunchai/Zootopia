package entity

import (

	"gorm.io/gorm"
)

type Employees struct {
	gorm.Model
	Bio  string 
	Experience  string 
	Education     string 

	// UserId ทำหน้าที่เป็น FK
	UserID *uint
	User   *Users `gorm:"foreignKey:UserID"`
}