import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'consumer',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Create account</p>
        <h1>Join the platform</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
            />
          </label>

          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Phone number</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />
          </label>

          <label className="field">
            <span>I am joining as</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="consumer">Consumer</option>
              <option value="provider">Provider</option>
            </select>
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Create Account
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;