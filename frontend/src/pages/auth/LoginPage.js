import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← إضافة useNavigate
import LoginImage from "../assets/images/login_logo.png"; // ← import الصورة

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ← إنشاء navigate

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    paddingTop: "80px",
    backgroundColor: "#fff",
  };

  const boxStyle = {
    display: "flex",
    maxWidth: "1000px",
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
  };

  const formStyle = {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#6B8FB5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const imageStyle = {
    flex: 1,
    objectFit: "contain",
    width: "100%",
    height: "100%",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert("Please enter email and password");
    }
  };

  // ← دالة للانتقال لصفحة استرجاع كلمة المرور
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
            Login
          </h1>
          <p style={{ marginBottom: "20px" }}>Login to access your account</p>

          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                textDecoration: "underline",
                fontSize: "14px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" style={buttonStyle}>Log in</button>
        </form>

        <div style={{ flex: 1 }}>
          <img src={LoginImage} alt="login illustration" style={imageStyle} />
        </div>
      </div>
    </div>
  );
}
