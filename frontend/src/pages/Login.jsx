import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  function handleChange(e)
  {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e)
  {
    e.preventDefault();

    try
    {
      const result = await api.post("/auth/login", form);
      setUser(result.data.user);
      setToken(result.data.token);
      navigate("/");
    }
    catch (errors)
    {
      setError(errors.response?.data?.error || "Invalid username or password.");
    }
  }

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <p className="auth-switch-text">
        Don't have an account?{" "}
        <a href="/register">Register</a>
      </p>
    </div>
  );
}
