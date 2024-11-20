package main

import (
	"net/http"

	"github.com/Tawunchai/Zootopia/config"
	"github.com/Tawunchai/Zootopia/controller/Animal"
	"github.com/Tawunchai/Zootopia/controller/Calendar"
	"github.com/Tawunchai/Zootopia/controller/Event"
	"github.com/Tawunchai/Zootopia/controller/Habitat"
	"github.com/Tawunchai/Zootopia/controller/Like"
	"github.com/Tawunchai/Zootopia/controller/Report"
	"github.com/Tawunchai/Zootopia/controller/Review"
	"github.com/Tawunchai/Zootopia/controller/Sex"
	"github.com/Tawunchai/Zootopia/controller/Behavioral"
	"github.com/Tawunchai/Zootopia/controller/Biological"
	"github.com/Tawunchai/Zootopia/controller/Zone"
	"github.com/gin-gonic/gin"
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
		r.Static("/uploads", "./uploads") // กำหนด static route
		//router.Use(middlewares.Authorizes())

		// Animals Routes
		router.POST("/animals-create", animal.CreateAnimal)
		router.GET("/animals", animal.ListAnimals)

		// Zone Routes
		router.GET("/zones", zone.ListZone)

		// Sex Routes
		router.GET("/sexs", sex.ListSex)

		// Biological Routes
		router.GET("/behaviorals", behavioral.ListBehaviorals)

		// Biological Routes
		router.GET("/biologicals", biological.ListBiological)

		// Report Routes
		router.POST("/reports-create", report.CreateReport)

		//Calendar Routes
		router.GET("/calendar", calendar.ListCalendar)
        router.POST("/create-calendar", calendar.CreateCalendar)
        router.DELETE("/delete-calendar/:id", calendar.DeleteCalendar)
		
		//Review Routes
		router.GET("/user-review/:id", review.GetUserByIdReviews)
		router.GET("/reviews", review.ListReview)
		router.POST("/reviews-create", review.CreateReview)
		router.GET("/ratings", review.GetAllRatingsAvg)
		router.GET("/reviews/filter", review.GetFilteredReviews)
		router.GET("/reviews/search", review.SearchReviewsByKeyword)

		//Like Routes
		router.POST("/reviews/like", like.LikeReview)
		router.DELETE("/reviews/unlike", like.UnlikeReview)
		router.GET("/reviews/:userID/:reviewID/like", like.CheckUserLikeStatus)

		//Event Routes
		router.POST("/events-create", event.CreateEvent)
		router.GET("/events", event.ListEvent)

		//Habitat Routes
		router.POST("/habitats-create", habitat.CreateHabitat)
		router.GET("/habitats", habitat.ListHabitat)
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
