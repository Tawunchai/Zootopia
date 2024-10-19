package controller

import (
	"net/http"

	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
	"github.com/gin-gonic/gin"
)

func ListAnimals(c *gin.Context) {

	var animals []entity.Animal

	db := config.DB()
	results := db.Preload("Gender").Preload("Behavioral").Preload("Category").Find(&animals)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, animals)
}

// POST /users
func CreateAnimal(c *gin.Context) {
	var animal entity.Animal

	if err := c.ShouldBindJSON(&animal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var gender entity.Gender
	db.First(&gender, animal.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	var behavioral entity.Behavioral
	db.First(&behavioral, animal.BehavioralID)
	if behavioral.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	var category entity.Category
	db.First(&category, animal.CategoryID)
	if category.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	a := entity.Animal{
		Name: animal.Name,
		Description: animal.Description,
		BirthDay: animal.BirthDay,
		GenderID:  animal.GenderID,
		Gender:    gender, // โยงความสัมพันธ์กับ Entity Gender
		BehavioralID:  animal.BehavioralID,
		Behavioral:    behavioral, 
		CategoryID:  animal.CategoryID,
		Category:    category,
	}

	// บันทึก
	if err := db.Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": a})
}
