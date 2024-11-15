package habitat

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
)

func ListHabitat(c *gin.Context) {
	var habitats []entity.Habitat

	db := config.DB()

	db.Find(&habitats)

	c.JSON(http.StatusOK, &habitats)
}
