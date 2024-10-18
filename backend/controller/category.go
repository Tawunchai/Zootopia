package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
)

func ListCategorys(c *gin.Context) {
	var categorys []entity.Category

	db := config.DB()

	db.Find(&categorys)

	c.JSON(http.StatusOK, &categorys)
}
