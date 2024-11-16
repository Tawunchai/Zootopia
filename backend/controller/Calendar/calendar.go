package calendar

import (
	"fmt"
	"net/http"
	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
	"github.com/gin-gonic/gin"
)

func ListCalendar(c *gin.Context) {
	var calendars []entity.Calendar

	if err := config.DB().Preload("Employee").Find(&calendars).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// เพิ่มการตรวจสอบว่า id, title และ startDate ถูกต้อง
	for _, calendar := range calendars {
		if calendar.StartDate.IsZero() || calendar.Title == "" {
			fmt.Println("Found invalid calendar data:", calendar)
		}
	}

	c.JSON(http.StatusOK, calendars)
}


func CreateCalendar(c *gin.Context) {
	var input entity.Calendar

	// Bind incoming JSON to input struct
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Log the received input for debugging
	fmt.Println("Received Calendar:", input)

	// Ensure EmployeeID is provided and valid
	if input.EmployeeID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EmployeeID is required"})
		return
	}

	// Create the new calendar event in the database
	if err := config.DB().Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, input)
}

func DeleteCalendar(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB().Delete(&entity.Calendar{}, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Calendar not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Calendar deleted successfully"})
}
