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
	results := db.Preload("Gender").Find(&animals)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, animals)
}