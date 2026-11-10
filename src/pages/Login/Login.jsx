import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'consumer',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.role === 'provider') {
      navigate('/provider-dashboard');
      return;
    }

    navigate('/consumer-dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in to your platform</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          <label className="field">
            <span>Sign in as</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="consumer">Consumer</option>
              <option value="provider">Provider</option>
            </select>
          </label>

          <button type="submit" className="primary-button">
            Sign In
          </button>
        </form>

        <p className="switch-link">
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;