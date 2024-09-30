// // import React, { useEffect, useState } from "react";
// // import "./Signin.css";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Signin = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [rememberMe, setRememberMe] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (localStorage.getItem("token")) {
// //       navigate("/MyMovie");
// //     }
// //   }, [navigate]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setErrorMessage("");

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/users/login",
// //         {
// //           email,
// //           password,
// //         }
// //       );

// //       // Check if the token is present in the response
// //       const token = response.data.token;
// //       if (!token) {
// //         throw new Error("Token not found in response.");
// //       }

// //       console.log("Login successful, token:", token);

// //       // Store the token based on the "Remember me" option
// //       if (rememberMe) {
// //         localStorage.setItem("token", token);
// //         console.log("Token stored in localStorage");
// //       } else {
// //         sessionStorage.setItem("token", token);
// //         console.log("Token stored in sessionStorage");
// //       }

// //       // Navigate to MyMovie after successful login
// //       navigate("/MyMovie");
// //     } catch (error) {
// //       console.error("Error during login:", error);
// //       if (error.response) {
// //         setErrorMessage(
// //           error.response.data.message || "Invalid email or password"
// //         );
// //       } else if (error.request) {
// //         setErrorMessage("No response from the server. Please try again later.");
// //       } else {
// //         setErrorMessage("An unexpected error occurred. Please try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="signin-container">
// //       <div className="signin-box">
// //         <h2>Sign in</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="input-group">
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="input-group">
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="remember-me">
// //             <input
// //               type="checkbox"
// //               id="rememberMe"
// //               checked={rememberMe}
// //               onChange={(e) => setRememberMe(e.target.checked)}
// //             />
// //             <label htmlFor="rememberMe">Remember me</label>
// //           </div>
// //           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
// //           <button type="submit" className="login-button" disabled={loading}>
// //             {loading ? "Signing in..." : "Login"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signin;
// import React, { useEffect, useState } from "react";
// import "./Signin.css";
// import { useNavigate,Link } from "react-router-dom";
// import axios from "axios";
// import Vectors from '../../assets/Capture11.PNG';

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/MyMovie");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/login",
//         {
//           email,
//           password,
//         }
//       );

//       const token = response.data.token;
//       if (!token) {
//         throw new Error("Token not found in response.");
//       }

//       console.log("Login successful, token:", token);

//       if (rememberMe) {
//         localStorage.setItem("token", token);
//         console.log("Token stored in localStorage");
//       } else {
//         sessionStorage.setItem("token", token);
//         console.log("Token stored in sessionStorage");
//       }

//       navigate("/MyMovie");
//     } catch (error) {
//       console.error("Error during login:", error);
//       if (error.response) {
//         setErrorMessage(
//           error.response.data.message || "Invalid email or password"
//         );
//       } else if (error.request) {
//         setErrorMessage("No response from the server. Please try again later.");
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signin-container">
//       <div className="signin-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="remember-me">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//             />
//             <label htmlFor="rememberMe">Remember me</label>
//           </div>
//           <Link to="/signup">Have You create new account?</Link>
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? "Signing in..." : "Login"}
//           </button>
//         </form>
//       </div>

//       {/* Footer with image */}
//       <footer className="signin-footer">
//       <img src={Vectors} alt="Footer graphic" />
//       </footer>
//     </div>
//   );
// };

// export default Signin;

import React, { useEffect, useState } from "react";
import "./Signin.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Vectors from "../../assets/Capture11.PNG";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      if (!token) {
        throw new Error("Token not found in response.");
      }

      console.log("Login successful, token:", token);

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/MyMovie");
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Invalid email or password"
        );
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
        <h2>Sign in</h2>
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
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="/signup">Have You created a new account?</Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Footer with image */}
      <footer className="signin-footer">
        <img src={Vectors} alt="Footer graphic" />
      </footer>
    </div>
  );
};

export default Signin;

