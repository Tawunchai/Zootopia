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
