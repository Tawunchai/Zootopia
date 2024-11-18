package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/controller/Calendar"
	"github.com/Tawunchai/Zootopia/controller/Review"
	//"github.com/Tawunchai/Zootopia/middlewares"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		//router.Use(middlewares.Authorizes())
		// Animals Routes

		//Calendar Routes
		router.GET("/calendar", calendar.ListCalendar)
        router.POST("/create-calendar", calendar.CreateCalendar)
        router.DELETE("/delete-calendar/:id", calendar.DeleteCalendar)
		
		//Review Routes
		router.GET("/user-review/:id", review.GetUserByIdReviews)
		router.GET("/reviews", review.ListReview)
		router.POST("/reviews-create", review.CreateReview)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
