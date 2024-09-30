// index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./CONNECTION/db");
const userRoutes = require("./Routes/UserRoutes");
const moviesRoutes = require("./Routes/MoviesRoutes");
const protect = require("./Middlewares/protection");
const path = require("path");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());

// CORS configuration to allow requests from your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL (React app)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials like cookies
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", protect, moviesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
