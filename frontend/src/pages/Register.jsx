import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(
  {
    username: "",
    password: "",
    repeatPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState(
  {
    username: "",
    password: "",
    repeatPassword: "",
    terms: "",
  });
  function handleChange(e)
  {
    const { name, type, value, checked } = e.target;
    let result = value;
    if(type === "checkbox")
    {
      result = value;
    }
    setForm(
    {
      ...form,
      [name]:  result,
    });
    setErrors({ ...errors, [name]: "" });
  }

  function checking_inputs()
  {
    let flag = true;
    const errors = { username: "", password: "", repeatPassword: "", terms: "" };

    if (form.username.trim() === "")
    {
      errors.username = "Invalid Username.";
      flag = false;
    }
    if (form.password.length < 8 || !/\d/.test(form.password))
    {
      errors.password = "Invalid password. Enter a password that is at least 8 characters long and contains a number.";
      flag = false;
    }
    if (form.password !== form.repeatPassword || !form.repeatPassword)
    {
      errors.repeatPassword = "The two passwords do not match.";
      flag = false;
    }

    if (!form.terms)
    {
      errors.terms = "You must agree before registering.";
      flag = false;
    }
    setErrors(errors);
    return flag;
  }

  async function handleSubmit(e)
  {
    e.preventDefault();
    if (checking_inputs() === false)
    {
      return;
    }
    try
    {
      await api.post("/auth/register",
      {
        username: form.username,
        password: form.password,
      });

      navigate("/login");
    }
    catch (errors1)
    {
      setErrors(
      {
        ...errors,
        username: "Username already exists. / Invalid Username.",
      });
    }
  }
  return (
    <div className="register-box">
      <h2>Register user</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="row">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <span className="error">{errors.username}</span>
        </div>
        <div className="row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <div className="row">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={form.repeatPassword}
            onChange={handleChange}
          />
          <span className="error">{errors.repeatPassword}</span>
        </div>
        <div className="checkbox-row">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <label>I agree to the Terms and Conditions and Privacy Policy</label>
          <span className="error terms-error">{errors.terms}</span>
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
}
