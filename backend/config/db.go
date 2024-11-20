package config

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/Tawunchai/Zootopia/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

type CustomLogger struct{}

func (l *CustomLogger) LogMode(level logger.LogLevel) logger.Interface {
	return l
}

func (l *CustomLogger) Info(ctx context.Context, msg string, args ...interface{}) {}

func (l *CustomLogger) Warn(ctx context.Context, msg string, args ...interface{}) {}

func (l *CustomLogger) Error(ctx context.Context, msg string, args ...interface{}) {
	if !strings.Contains(msg, "record not found") {
		log.Printf(msg, args...)
	}
}

func (l *CustomLogger) Trace(ctx context.Context, begin time.Time, fc func() (string, int64), err error) {
	// ไม่ทำอะไรใน Trace
}


func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("Zootopia.db?cache=shared"), &gorm.Config{
		Logger: &CustomLogger{},
	})

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

	SexMale := entity.Sex{Sex: "Male"}
	SexFemale := entity.Sex{Sex: "Female"}

	db.FirstOrCreate(&SexMale, &entity.Sex{Sex: "Male"})
	db.FirstOrCreate(&SexFemale, &entity.Sex{Sex: "Female"})

	AdminRole := entity.UserRoles{RoleName: "Admin"}
	ZookeeperRole := entity.UserRoles{RoleName: "Zookeeper"}
	USerRole := entity.UserRoles{RoleName: "User"}

	db.FirstOrCreate(&AdminRole, &entity.UserRoles{RoleName: "Admin"})
	db.FirstOrCreate(&ZookeeperRole, &entity.UserRoles{RoleName: "Zookeeper"})
	db.FirstOrCreate(&USerRole, &entity.UserRoles{RoleName: "User"})

	Behavioral1 := entity.Behavioral{Behavioral: "Eat meat"}
	Behavioral2 := entity.Behavioral{Behavioral: "Eat plants"}

	db.FirstOrCreate(&Behavioral1, &entity.Behavioral{Behavioral: "Eat meat"})
	db.FirstOrCreate(&Behavioral2, &entity.Behavioral{Behavioral: "Eat plants"})

	Biological1 := entity.Biological{Biological: "Avian"}
	Biological2 := entity.Biological{Biological: "Mammalian"}

	db.FirstOrCreate(&Biological1, &entity.Biological{Biological: "Avian"})
	db.FirstOrCreate(&Biological2, &entity.Biological{Biological: "Mammalian"})

	zone1 := entity.Zone{
		Zone:        "Rainforest",
		Description: "Tropical rainforest with a variety of wildlife.",
		Price:       150.00,
		Picture:     "rainforest.jpg",
	}
	zone2 := entity.Zone{
		Zone:        "Savannah",
		Description: "Expansive savannah with African wildlife.",
		Price:       120.00,
		Picture:     "savannah.jpg",
	}
	zone3 := entity.Zone{
		Zone:        "Oceanarium",
		Description: "Aquatic animals and marine life exhibits.",
		Price:       100.00,
		Picture:     "oceanarium.jpg",
	}

	// Insert sample zones if they don't exist
	db.FirstOrCreate(&zone1, entity.Zone{Zone: "Rainforest"})
	db.FirstOrCreate(&zone2, entity.Zone{Zone: "Savannah"})
	db.FirstOrCreate(&zone3, entity.Zone{Zone: "Oceanarium"})

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

	hashedPassword, _ := HashPassword("123456")
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")

	User1 := &entity.User{
		Username:   "Tawunchai",
		Password:   hashedPassword,
		Email:      "tawunchaien@gmail.com",
		FirstName:  "Tawunchai",
		LastName:   "Burakhon",
		Birthday:   BirthDay,
		Profile:    "",
		UserRoleID: 2, 
		GenderID:   1,
	}

	db.FirstOrCreate(User1, &entity.User{
		Username: "Parichat",
	})

	User2 := &entity.User{
		Username:   "Kanyapron",
		Password:   hashedPassword,
		Email:      "Kanyapron@gmail.com",
		FirstName:  "Kanyapron",
		LastName:   "Koondet",
		Birthday:   BirthDay,
		Profile:    "",
		UserRoleID: 3, 
		GenderID:   2,
	}

	db.FirstOrCreate(User2, &entity.User{
		Username: "Kanyapron",
	})

	User3 := &entity.User{
		Username:   "Janisata",
		Password:   hashedPassword,
		Email:      "Janisata@gmail.com",
		FirstName:  "Janisata",
		LastName:   "Tang Krajangjit",
		Birthday:   BirthDay,
		Profile:    "",
		UserRoleID: 3, 
		GenderID:   2,
	}

	db.FirstOrCreate(User3, &entity.User{
		Username: "Janisata",
	})

	User4 := &entity.User{
		Username:   "Nuttagun",
		Password:   hashedPassword,
		Email:      "Nuttagun@gmail.com",
		FirstName:  "Nuttagun",
		LastName:   "Samanjai",
		Birthday:   BirthDay,
		Profile:    "",
		UserRoleID: 3, 
		GenderID:   1,
	}

	db.FirstOrCreate(User4, &entity.User{
		Username: "Nuttagun",
	})

	uid1 := uint(1)
	uid2 := uint(2)
	uid3 := uint(3)
	uid4 := uint(4)

	Review1 := &entity.Review{
		Rating:     5,
		Comment:    "The zoo was incredibly well-maintained, and the animals looked happy and healthy. The staff were friendly and knowledgeable, always ready to share interesting facts about the animals. I loved the interactive exhibits, especially the feeding sessions with the giraffes! Its a great place for families, and theres something for everyone to enjoy. I can't wait to visit again!",
		ReviewDate: time.Now(),
		Picture:    "",
		UserID:     &uid1,
	}

	Review2 := &entity.Review{
		Rating:     4,
		Comment:    "The zoo had a wide variety of animals, and the staff were helpful. However, some areas felt overcrowded, and a few enclosures looked outdated. The food options were decent, but a bit overpriced. Its a nice place to visit, but it could be even better with a few updates",
		ReviewDate: time.Now(),
		Picture:    "",
		UserID:     &uid2,
	}

	Review3 := &entity.Review{
		Rating:     3,
		Comment:    "The animals were interesting, and the staff seemed to care about them. However, some enclosures felt too small, and the facilities could have been cleaner. The ticket price was a bit high for the experience provided. It was okay, but I wouldnt rush back.",
		ReviewDate: time.Now(),
		Picture:    "",
		UserID:     &uid3,
	}

	Review4 := &entity.Review{
		Rating:     2,
		Comment:    "The zoo was not well-maintained, and several exhibits were closed. Many enclosures seemed small and lacked enrichment for the animals. The staff were not very attentive, and the overall atmosphere felt uninviting. Unfortunately, I wouldnt recommend visiting.",
		ReviewDate: time.Now(),
		Picture:    "",
		UserID:     &uid4,
	}

	db.FirstOrCreate(Review1, &entity.Review{UserID: &uid1})
	db.FirstOrCreate(Review2, &entity.Review{UserID: &uid2})
	db.FirstOrCreate(Review3, &entity.Review{UserID: &uid3})
	db.FirstOrCreate(Review4, &entity.Review{UserID: &uid4})
}
