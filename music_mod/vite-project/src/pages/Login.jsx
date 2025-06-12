import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data === "Success") {
          navigate("/");
        } else {
          setError("Wrong password or no record exists"); // Set error message
        }
      })
      .catch((err) => {
        console.error("There was an error logging in!", err);
        setError("Login failed. Please check your credentials."); // Set error message in page
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
