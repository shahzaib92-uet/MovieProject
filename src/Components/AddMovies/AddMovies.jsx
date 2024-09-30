import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./AddMovie.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const AddMovies = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve token from location.state or fallback to localStorage
  const [token, setToken] = useState(
    location.state?.token || localStorage.getItem("token")
  );

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!token) {
      console.error(
        "No authentication token found. Redirecting to login page."
      );
      navigate("/");
    }
  }, [token, navigate]);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]); // Set the selected image
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the publishing year
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      alert(
        `Invalid year. Please enter a valid year between 1900 and ${currentYear}.`
      );
      return;
    }

    // Ensure all required fields are filled
    if (!title || !year || !image) {
      alert("All fields are required, including the image.");
      return;
    }

    // Create form data for submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("image", image); // Attach the image with key 'image', as expected by multer

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/movies/add-movie",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie added successfully!"); // Show success notification
      navigate("/MyMovie"); // Navigate to My Movies page
    } catch (error) {
      console.error("Error adding movie:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("There was an error adding the movie. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="movie-form-container">
      <h2 className="form-title">Create a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="image-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="movie"
                className="img-preview"
              />
            ) : (
              <p>Drop an image here or click to select</p>
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
                type="number"
                className="form-control"
                placeholder="Publishing Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="form-buttons">
              <button
                className="btn btn-secondary me-2"
                type="button"
                onClick={() => navigate("/MyMovie")}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                type="submit"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>
     
    </div>
  );
};

export default AddMovies;
