import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Vectors from '../../assets/Capture11.PNG';
import "./Signup.css"; // Reusing the same CSS file


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });

      // After successful signup, redirect to login page
      if (response.status === 201) {
        console.log("Signup successful, redirecting to login page");
        navigate("/"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to sign up");
      } else if (error.request) {
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/">Already have an account? Sign in here</Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
      <footer className="signin-footer">
      <img src={Vectors} alt="Footer graphic" />
      </footer>
    </div>
  );
};

export default Signup;
