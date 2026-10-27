import React, { useState } from "react";
import roomImg from "../images/img2.jpg";

function Login() {
  // Mode options: "login", "signup", "reset"
  const [mode, setMode] = useState("login"); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Determine target URL based on current mode
    let url = "http://localhost:5000/api/auth/login";
    if (mode === "signup") {
      url = "http://localhost:5000/api/auth/signup";
    } else if (mode === "reset") {
      url = "http://localhost:5000/api/auth/reset-password";
    }

    const payload =
      mode === "reset"
        ? { email: formData.email, newPassword: formData.password }
        : formData;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend server on port 5000 is not responding properly.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      if (mode === "reset") {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          setMode("login");
          setMessage("");
        }, 1500);
      } else {
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        setMessage(
          mode === "signup"
            ? "Account created successfully!"
            : "Logged in successfully!"
        );

        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setMessage("");
  };

  return (
    <div className="auth">
      <div className="auth-visual">
        <img src={roomImg} alt="" />
        <p>Your table is waiting. Sign in to order.</p>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h1>
            {mode === "signup"
              ? "Create an account"
              : mode === "reset"
              ? "Reset your password"
              : "Welcome back"}
          </h1>
          <p>
            {mode === "signup"
              ? "Sign up to start ordering your favorite meals."
              : mode === "reset"
              ? "Enter your email and choose a new password."
              : "Sign in to your account to place an order."}
          </p>

          {error && <div className="notice notice-error" role="alert">{error}</div>}
          {message && <div className="notice notice-ok" role="status">{message}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && (
              <div className="field">
                <label htmlFor="l-name">Full name</label>
                <input
                  id="l-name"
                  className="input"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="field">
              <label htmlFor="l-email">Email</label>
              <input
                id="l-email"
                className="input"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="l-password">
                {mode === "reset" ? "New password" : "Password"}
              </label>
              <input
                id="l-password"
                className="input"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              {mode === "signup"
                ? "Create account"
                : mode === "reset"
                ? "Update password"
                : "Sign in"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "login" && (
              <>
                <button type="button" className="btn-link" onClick={() => switchMode("reset")}>
                  Forgot your password?
                </button>
                <br />
                New here?{" "}
                <button type="button" className="btn-link" onClick={() => switchMode("signup")}>
                  Create an account
                </button>
              </>
            )}

            {(mode === "signup" || mode === "reset") && (
              <>
                Already have an account?{" "}
                <button type="button" className="btn-link" onClick={() => switchMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
