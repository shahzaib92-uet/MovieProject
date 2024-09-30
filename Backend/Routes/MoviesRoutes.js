// MoviesRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../Controller/MoviesController"); // Adjust the path according to your project structure
const { uploadMiddleware } = movieController; // Import the upload middleware if used in the routes

// Get all movies
router.get("/", movieController.getMovies);

// Add a new movie
router.post("/add-movie", uploadMiddleware, movieController.addMovie);

// Update a movie
router.put("/update/:id", uploadMiddleware, movieController.updateMovie);

// Uncomment and define the delete route when needed
// router.delete('/delete/:id', movieController.deleteMovie);

module.exports = router;
