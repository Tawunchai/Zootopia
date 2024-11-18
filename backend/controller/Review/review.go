package review

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

func GetUserByIdReviews(c *gin.Context) {
	ID := c.Param("id")
	var user entity.User

	db := config.DB()
	results := db.Preload("UserRole").First(&user, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if user.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

func CreateReview(c *gin.Context) {
	var review entity.Review
	db := config.DB()

	imageproduct, err := c.FormFile("imageproduct")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uploadDir := "uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	filePath := filepath.Join(uploadDir, imageproduct.Filename)
	if err := c.SaveUploadedFile(imageproduct, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ratingStr := c.PostForm("rating")
	rating, err := strconv.ParseUint(ratingStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid rating"})
		return
	}

	userIDStr := c.PostForm("userID")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid userID"})
		return
	}
	userIDPointer := uint(userID)

	review.Rating = uint(rating)
	review.Comment = c.PostForm("comment")
	review.Picture = filePath
	review.UserID = &userIDPointer
	review.ReviewDate = time.Now()

	if err := db.Create(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Review created successfully", "data": review})
}

func GetAllRatingsAvg(c *gin.Context) {
	var ratings []uint

	db := config.DB()

	if err := db.Model(&entity.Review{}).Pluck("rating", &ratings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching ratings"})
		return
	}

	if len(ratings) == 0 {
		c.JSON(http.StatusOK, gin.H{"ratings": []uint{}})
		return
	}

	c.JSON(http.StatusOK, gin.H{"ratings": ratings})
}

func GetFilteredReviews(c *gin.Context) {
	starLevel := c.Query("starLevel")

	var rating uint
	switch starLevel {
	case "5Star":
		rating = 5
	case "4Star":
		rating = 4
	case "3Star":
		rating = 3
	case "2Star":
		rating = 2
	case "1Star":
		rating = 1
	case "All":
		rating = 0
	case "":
		rating = 0
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid star level"})
		return
	}

	db := config.DB()

	var reviews []entity.Review
	query := db.Preload("User")

	if rating != 0 {
		query = query.Where("rating = ?", rating)
	}

	results := query.Find(&reviews)
	if results.Error != nil {
		fmt.Println("Database Error:", results.Error) // เพิ่มการพิมพ์ข้อผิดพลาด
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	if len(reviews) == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, reviews)
}

func SearchReviewsByKeyword(c *gin.Context) {
	keyword := c.Query("keyword")

	var reviews []entity.Review
	db := config.DB()

	// หากไม่ต้องใช้ courseID ให้กรองตาม keyword เพียงอย่างเดียว
	query := db.Preload("User").Where("comment LIKE ?", "%"+keyword+"%")

	results := query.Find(&reviews)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	if len(reviews) == 0 {
		c.JSON(http.StatusNoContent, gin.H{"message": "No reviews found"})
		return
	}

	c.JSON(http.StatusOK, reviews)
}
