import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // call backend directly
      const res = await axios.post("http://localhost:5000/api/login", { email, password });

      if (res.data.success) {
        // ✅ Store token if available
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        setMessage("✅ Login successful!");
        navigate("/home");
      } else {
        setMessage("❌ " + (res.data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login request failed:", error);

      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else if (error.request) {
        setMessage("❌ Network error: could not reach the server. Is backend running?");
      } else {
        setMessage("❌ " + (error.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/">Signup</Link>
      </p>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
