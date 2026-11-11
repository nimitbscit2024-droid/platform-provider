import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Demo login navigation.
    // Replace this with backend authentication when available.
    const userType = localStorage.getItem("userType");

    if (userType === "provider") {
      navigate("/provider-dashboard");
    } else {
      navigate("/consumer-dashboard");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Login Form */}
        <div className="login-content">

          <div className="login-header">
            <h1>Welcome Back</h1>

            <p>
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="login-form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

        </div>

        {/* Sign Up Footer */}
        <div className="login-footer">

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Sign up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;