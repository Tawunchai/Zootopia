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
		&entity.Genders{},
		&entity.Behavioral{},
		&entity.Category{},
		&entity.Employees{},
		&entity.Likes{},
		&entity.Reviews{},
		&entity.Tasks{},
		&entity.Users{},
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

	Category1 := entity.Category{Name: "Land animals"}
	Category2 := entity.Category{Name: "Aquatic animals"}
	Category3 := entity.Category{Name: "Poultry"}

	db.FirstOrCreate(&Category1, &entity.Category{Name: "Land animals"})
	db.FirstOrCreate(&Category2, &entity.Category{Name: "Aquatic animals"})
	db.FirstOrCreate(&Category3, &entity.Category{Name: "Poultry"})

	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
	Animal1 := &entity.Animal{
		Name: "Lion",
		Description: "The lion is a mammal in the cat family.",
		BirthDay:  BirthDay,
		GenderID:  2,
		CategoryID:  1,
		BehavioralID:  1,
	}

	Animal2 := &entity.Animal{
		Name: "Hippo",
		Description: "The Hippo is Bigger than is zoo",
		GenderID:  1,
		CategoryID:  1,
		BehavioralID:  1,
	}

	db.FirstOrCreate(Animal1, &entity.Animal{Name: "Lion",})
	db.FirstOrCreate(Animal2, &entity.Animal{Name: "Hippo",})
}
