import React, { useState } from "react";
import "./Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // for success/error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated server error example
    if (!name || !email || !password) {
      setMessage("❌ Server error: All fields are required");
      return;
    }

    // Here you would normally send data to your backend
    setMessage("✅ Account created successfully!");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <p className="link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
