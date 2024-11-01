package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
)

func ListGenders(c *gin.Context) {
	var genders []entity.Genders

	db := config.DB()

	db.Find(&genders)

	c.JSON(http.StatusOK, &genders)
}
