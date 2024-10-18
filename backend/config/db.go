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
		&entity.Gender{},
		&entity.Behavioral{},
		&entity.Category{},
	)

	GenderMale := entity.Gender{Name: "Male"}
	GenderFemale := entity.Gender{Name: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Gender{Name: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Gender{Name: "Female"})

	Behavioral1 := entity.Behavioral{Behavioral: "Eat meat"}
	Behavioral2 := entity.Behavioral{Behavioral: "Eat plants"}

	db.FirstOrCreate(&Behavioral1, &entity.Behavioral{Behavioral: "Eat meat"})
	db.FirstOrCreate(&Behavioral2, &entity.Behavioral{Behavioral: "Eat plants"})

	Category1 := entity.Category{Name: "Land animals"}
	Category2 := entity.Category{Name: "Aquatic animals"}
	Category3 := entity.Category{Name: "Poultry"}

	db.FirstOrCreate(&Category1, &entity.Category{Name: "Land animals"})
	db.FirstOrCreate(&Category2, &entity.Category{Name: "Aquatic animals"})
	db.FirstOrCreate(&Category3, &entity.Category{Name: "Poultry"})

	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
	Animal := &entity.Animal{
		Name: "Lion",
		Description: "The lion is a mammal in the cat family with a tawny golden coat. Male lions are known for their large, prominent manes. They inhabit savannas and forests in Africa and are apex predators.",
		BirthDay:  BirthDay,
		GenderID:  2,
		CategoryID:  1,
		BehavioralID:  1,
	}

	db.FirstOrCreate(Animal, &entity.Animal{Name: "Lion",})
}
