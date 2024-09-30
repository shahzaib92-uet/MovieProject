import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditMovie.css";

const EditMovie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, token } = location.state || {}; // Destructure movie and token

  // Initialize state with movie data or fallback values
  const [image, setImage] = useState(movie?.image || "");
  const [title, setTitle] = useState(movie?.title || "");
  const [year, setYear] = useState(movie?.year || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Redirect if no movie is passed
  useEffect(() => {
    if (!movie) {
      navigate("/MyMovie");
    }
  }, [movie, navigate]);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]); // Set image if a new file is uploaded
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    onDropRejected: () =>
      setErrorMessage("Invalid file type. Please upload a valid image."),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setLoading(true); // Start loading

    // Validate required fields
    if (!title || !year) {
      setErrorMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Prepare FormData for the API request
    const formData = new FormData();
    formData.append("id", movie._id);
    formData.append("title", title);
    formData.append("year", year);

    // Attach image if it's a new file
    if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      // Update the movie with token in headers
      await axios.put(
        `http://localhost:5000/api/movies/update/${movie._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Navigate to the movie list after successful update
      navigate("/MyMovie");
    } catch (error) {
      console.error(
        "Error updating movie:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Error updating the movie. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleCancel = () => {
    navigate("/MyMovie");
  };

  return (
    <div className="edit-movie-container">
      <h2 className="edit-movie-title">Edit Movie</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="image-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <img  style={{
                width: "266px",
                height: "400px",
                borderRadius: "12px",
              }}
                src={
                  typeof image === "string"
                    ? `http://localhost:5000/uploads/${movie.image}`
                    : URL.createObjectURL(image)
                }
                alt="movie"
                className="img-preview"
              />
            ) : (
              <p className="dropzone-placeholder">
                Drop an image here or click to select
              </p>
            )}
          </div>

          <div className="form-inputs">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Publishing Year</label>
              <input
                type="text"
                className="form-control"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="form-buttons">
              <button
                className="btn btn-secondary me-2"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
