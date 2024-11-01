package entity

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Username  string	
	Password  string	
	Email     string	
	FirstName string    
   	LastName  string    
	Birthday  time.Time	
	Profile   string 	`gorm:"type:longtext"` // edit

	// UserRoleID ทำหน้าที่เป็น FK
	UserRoleID uint 
	UserRole   *UserRoles `gorm:"foreignKey: UserRoleID" `

	// GenderID ทำหน้าที่เป็น FK
	GenderID  uint    
   	Gender    *Genders  `gorm:"foreignKey: GenderID"`

	// 1 user สามารถมีได้ 1 TutorProfile 
	Employees  *Employees  `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีหลาย review
	Reviews []Reviews `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีได้หลาย task
	Task []Tasks `gorm:"foreignKey:UserID"`
}