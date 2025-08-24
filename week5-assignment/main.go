package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Game struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Price int    `json:"price"`
}

type Station struct {
	ID     string `json:"id"`
	Seats  int    `json:"seats"`
	Status string `json:"status"`
}

var games = []Game{
	{ID: "G01", Name: "Call of Duty", Genre: "FPS", Price: 299},
	{ID: "G02", Name: "FIFA 25", Genre: "Sports", Price: 199},
	{ID: "G03", Name: "Minecraft", Genre: "Sandbox", Price: 399},
	{ID: "G04", Name: "League of Legends", Genre: "MOBA", Price: 1099},
	{ID: "G05", Name: "Cyberpunk 2077", Genre: "RPG", Price: 499},
}

var stations = []Station{
	{ID: "S01", Seats: 1, Status: "available"},
	{ID: "S02", Seats: 2, Status: "available"},
	{ID: "S03", Seats: 4, Status: "available"},
	{ID: "S04", Seats: 6, Status: "reserved"},
}

func reserveStation(c *gin.Context) {
	id := c.Query("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "station id is required"})
		return
	}

	for i, station := range stations {
		if station.ID == id {
			if station.Status == "reserved" {
				c.JSON(http.StatusConflict, gin.H{"message": "Station already reserved"})
				return
			}
			stations[i].Status = "reserved"
			c.JSON(http.StatusOK, gin.H{"message": "Station reserved successfully", "station": stations[i]})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Station not found"})
}

func getGames(c *gin.Context) {
	priceQuery := c.Query("price")
	genreQuery := c.Query("genre")
	idQuery := c.Query("id")
	nameQuery := c.Query("name")

	filter := []Game{}
	for _, game := range games {
		match := true
		if idQuery != "" && game.ID != idQuery {
			match = false
		}
		if nameQuery != "" && game.Name != nameQuery {
			match = false
		}
		if priceQuery != "" && fmt.Sprint(game.Price) != priceQuery {
			match = false
		}
		if genreQuery != "" && game.Genre != genreQuery {
			match = false
		}
		if match {
			filter = append(filter, game)
		}
	}

	c.JSON(http.StatusOK, filter)
}

func main() {
	r := gin.Default()

	r.GET("/status", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Ready to play!"})
	})

	api := r.Group("/api/v9")
	{
		api.GET("/games", getGames)
		api.GET("/stations", reserveStation)
	}

	r.Run(":8080")
}