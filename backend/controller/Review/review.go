package review

import (
    "net/http"
    "github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/entity"
    "github.com/gin-gonic/gin"
)

func ListReview(c *gin.Context) {
    var reviews []entity.Review

    db := config.DB()
    results := db.Find(&reviews)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, reviews)
}