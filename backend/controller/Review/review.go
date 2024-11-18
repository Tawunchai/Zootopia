package review

import (
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

	// Get the uploaded image
	imageproduct, err := c.FormFile("imageproduct")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	uploadDir := "uploads"
	// Create the upload directory if it doesn't exist
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	// Save the uploaded file
	filePath := filepath.Join(uploadDir, imageproduct.Filename)
	if err := c.SaveUploadedFile(imageproduct, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Parse rating
	ratingStr := c.PostForm("rating")
	rating, err := strconv.ParseUint(ratingStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid rating"})
		return
	}

	// Parse userID
	userIDStr := c.PostForm("userID")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid userID"})
		return
	}
	userIDPointer := uint(userID)

	// Set review fields
	review.Rating = uint(rating)
	review.Comment = c.PostForm("comment")
	review.Picture = filePath
	review.UserID = &userIDPointer
	review.ReviewDate = time.Now()

	// Save the review to the database
	if err := db.Create(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return the response
	c.JSON(http.StatusCreated, gin.H{"message": "Review created successfully", "data": review})
}

