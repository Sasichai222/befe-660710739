package main

import (
	"fmt"
)

// var email string = "chairatudomkul_s@su.ac.th"

func main() {
	// var name string = "sasichai"
	var age int = 20

	email := "chairatudomkul_s@su.ac.th"
	gpa := 4.00

	firstname, lastname := "sasichai", "chairatudomkul"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)
}