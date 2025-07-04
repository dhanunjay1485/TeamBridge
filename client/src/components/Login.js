import React, { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Login</h2>
      <input name="email" placeholder="Email" autoComplete="new-email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
