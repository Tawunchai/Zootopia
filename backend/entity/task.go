package entity

import (
	"time"

	"gorm.io/gorm"
)

type Tasks struct { 
	gorm.Model
    Title     string         
	StartDate time.Time  
	EndDate   time.Time   
	AllDay    bool        

	UserID *uint
	User   Users  `gorm:"foreignKey:UserID"`
	
}