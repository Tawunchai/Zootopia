package animal

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
	"github.com/gin-gonic/gin"
)

func ListAnimals(c *gin.Context) {
	var animals []entity.Animal

	db := config.DB()
	results := db.Preload("Sex").Preload("Biological").Preload("Behavioral").Preload("Employee").Preload("Habitat").Find(&animals)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, animals)
}

func CreateAnimal(c *gin.Context) {
	var animal entity.Animal
	db := config.DB()

	image, err := c.FormFile("picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Error receiving image: %v", err)})
		return
	}


	uploadDir := "uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create upload directory: %v", err)})
		return
	}


	filePath := filepath.Join(uploadDir, image.Filename)
	if err := c.SaveUploadedFile(image, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save image: %v", err)})
		return
	}


	animal.Name = c.PostForm("name")
	animal.Description = c.PostForm("description")


	weightStr := c.PostForm("weight")
	weight, err := strconv.ParseFloat(weightStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid weight format: %v", err)})
		return
	}
	animal.Weight = weight

	heightStr := c.PostForm("height")
	height, err := strconv.ParseFloat(heightStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid height format: %v", err)})
		return
	}
	animal.Height = height

	animal.Birthplace = c.PostForm("birthplace")
	birthDayStr := c.PostForm("birthDay")
	birthDay, err := time.Parse("2006-01-02", birthDayStr) 
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid birth date format: %v", err)})
		return
	}
	animal.BirthDay = birthDay


	animal.Health = c.PostForm("health")
	animal.Note = c.PostForm("note")


	sexID, err := strconv.ParseUint(c.PostForm("sexID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid sex ID format: %v", err)})
		return
	}
	animal.SexID = uint(sexID)


	biologicalID, err := strconv.ParseUint(c.PostForm("biologicalID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid biological ID format: %v", err)})
		return
	}
	animal.BiologicalID = uint(biologicalID)


	behavioralID, err := strconv.ParseUint(c.PostForm("behavioralID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid behavioral ID format: %v", err)})
		return
	}
	animal.BehavioralID = uint(behavioralID)


	employeeID, err := strconv.ParseUint(c.PostForm("employeeID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid employee ID format: %v", err)})
		return
	}
	animal.EmployeeID = uint(employeeID)


	habitatID, err := strconv.ParseUint(c.PostForm("habitatID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid habitat ID format: %v", err)})
		return
	}
	animal.HabitatID = uint(habitatID)


	animal.Picture = filePath
	if err := db.Create(&animal).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create animal: %v", err)})
		return
	}


	c.JSON(http.StatusCreated, gin.H{
		"message": "Animal created successfully",
		"data":    animal,
	})
}

func DeleteAnimal(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	var animal entity.Animal

	if err := db.Where("id = ?", id).First(&animal).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal not found"})
		return
	}

	if err := db.Delete(&animal).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete animal"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Animal deleted successfully"})
}

func GetAnimalById(c *gin.Context) {
	id := c.Param("id") 
	db := config.DB()

	var animal entity.Animal

	if err := db.Preload("Sex").Preload("Biological").Preload("Behavioral").Preload("Employee").Preload("Habitat").Where("id = ?", id).First(&animal).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal not found"})
		return
	}

	c.JSON(http.StatusOK, animal)
}

func UpdateAnimal(c *gin.Context) {
	var animal entity.Animal
	db := config.DB()

	// Retrieve the animal ID from the URL path
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing animal ID"})
		return
	}

	// Fetch the existing animal by ID
	if err := db.Where("id = ?", id).First(&animal).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal not found"})
		return
	}

	// Bind the JSON body to the animal struct
	if err := c.BindJSON(&animal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to bind JSON: %v", err)})
		return
	}

	// Process fields that might have been updated (for example, the picture)
	if image, err := c.FormFile("picture"); err == nil {
		uploadDir := "uploads"
		if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create upload directory: %v", err)})
			return
		}

		// Save the new image if uploaded
		filePath := filepath.Join(uploadDir, image.Filename)
		if err := c.SaveUploadedFile(image, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save image: %v", err)})
			return
		}
		animal.Picture = filePath
	}

	// Save the updated animal to the database
	if err := db.Save(&animal).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update animal: %v", err)})
		return
	}

	// Return the updated animal
	c.JSON(http.StatusOK, gin.H{
		"message": "Animal updated successfully",
		"data":    animal,
	})
}





