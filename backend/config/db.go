package config

import (
	"fmt"
	"time"

	"github.com/Tawunchai/Zootopia/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("Zootopia.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Animal{},
		&entity.Sex{},
		&entity.Behavioral{},
		&entity.Biological{},
		&entity.Employee{},
		&entity.Habitat{},
		&entity.Event{},
		&entity.Work{},
		&entity.Report{},
		&entity.Zone{},
		&entity.Like{},
		&entity.Review{},
		&entity.Calendar{},
		&entity.User{},
		&entity.Genders{},
		&entity.UserRoles{},
	)

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	Behavioral1 := entity.Behavioral{Behavioral: "Eat meat"}
	Behavioral2 := entity.Behavioral{Behavioral: "Eat plants"}

	db.FirstOrCreate(&Behavioral1, &entity.Behavioral{Behavioral: "Eat meat"})
	db.FirstOrCreate(&Behavioral2, &entity.Behavioral{Behavioral: "Eat plants"})

	Employee := uint(1)

	// Creating initial Calendar events
	initialCalendars := []entity.Calendar{
		{
			Title:     "Animal Feeding",
			StartDate: time.Date(2024, 11, 20, 8, 0, 0, 0, time.UTC), // Example: 2024-11-20 08:00:00 UTC
			AllDay:    false,
			EmployeeID: &Employee, // Associate with employee (e.g., employee ID)
		},
		{
			Title:     "Health Checkup",
			StartDate: time.Date(2024, 11, 22, 10, 0, 0, 0, time.UTC), // Example: 2024-11-22 10:00:00 UTC
			AllDay:    false,
			EmployeeID: &Employee,
		},
	}

	// Insert initial Calendar events if they don't already exist
	for _, calendar := range initialCalendars {
		db.FirstOrCreate(&calendar, entity.Calendar{Title: calendar.Title, StartDate: calendar.StartDate})
	}
}
