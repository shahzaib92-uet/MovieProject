// MoviesController.js
const Movie = require("../models/Movies");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed"));
    }
  },
});

// Middleware for file uploads
exports.uploadMiddleware = upload.single("image");

// Add a new movie
exports.addMovie = async (req, res) => {
  const { title, year } = req.body;
  const image = req.file;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!title || !year) {
    return res.status(400).json({ message: "Title and year are required." });
  }

  try {
    const movie = await Movie.create({
      title,
      year,
      image: image ? image.filename : null, // Save just the filename
      user: req.user.id,
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error("Error occurred while adding movie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all movies for the user
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, year } = req.body;
  const image = req.file;

  try {
    let movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedData = {
      title: title || movie.title,
      year: year || movie.year,
      image: image ? image.filename : movie.image, // Save just the filename
    };

    movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
