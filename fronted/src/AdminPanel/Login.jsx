import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import baseUrl from '/src/baseUrl.js'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/admin/login`, { username, password });
      console.log("Login admin page response: ", response.data);

      // Check for a successful response and a valid admin message
      if (response.data.msg === "Login successful") {
        localStorage.setItem("isAdmin", "true"); // Set admin status in local storage
        console.log("Redirecting to admin page");
        navigate('/admin'); // Redirect to admin page after successful login
      } else {
        localStorage.removeItem("isAdmin"); // Clear admin status on invalid login
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login: ", error); // Log the error for debugging
      localStorage.removeItem("isAdmin"); // Also remove admin status on error
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="submit-button-login">Login</button>
      </form>
    </div>
  );
}

export default Login;
