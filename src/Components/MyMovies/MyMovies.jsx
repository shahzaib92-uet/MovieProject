import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyMovies.css";


const MyMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Navigate to the login page if no token is found
      navigate("/");
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/movies/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
        setError(""); // Clear any previous error
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMovies();
  }, [navigate]);

  const handleMovieClick = (movie) => {
    const token = localStorage.getItem("token");
    navigate(`/update-movie/${movie._id}`, { state: { movie, token } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const editMovie = (movie) => {
    navigate(`/update-movie/${movie._id}`, { state: { movie } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-list-container">
    <div>
      <header className="movie-list-header">
        <h1>
          My Movies
          <Link to="/add-movie">
            <span className="add-icon">+</span>
          </Link>
        </h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {movies.length === 0 ? (
        <div>No movies found. Please add some movies!</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              
              <img  style={{
                width: "266px",
                height: "400px",
                borderRadius: "12px",
              }}
                src={`http://localhost:5000/uploads/${movie.image}`}
                alt={movie.title}
                className="movie-image"
                onError={(e) => {
                  e.target.src = "/path/to/placeholder-image.jpg";
                }}
              />
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <button onClick={() => editMovie(movie)}>Edit</button>
            </div>
          ))}
        </div>
      )}
      
    </div>
  
    </div>
  );
};

export default MyMovies;
