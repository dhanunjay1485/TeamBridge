import React, { useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" autoComplete="new-email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
