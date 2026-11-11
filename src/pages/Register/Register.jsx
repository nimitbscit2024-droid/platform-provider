import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    dob: "",
    userType: "",
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const platforms = [
    "Amazon Prime",
    "Netflix",
    "Hulu",
    "Disney+",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const registrationData = {
      ...formData,
      platforms: selectedPlatforms,
    };

    console.log("Registration Data:", registrationData);

    // Navigate after successful registration
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="form-header">
          <h1>Create an Account</h1>
          <p>
            Enter your information to register as a consumer or provider.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St, City, Country"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select a user type</option>
                <option value="consumer">Consumer</option>
                <option value="provider">Provider</option>
              </select>
            </div>

          </div>

          <div className="platform-section">
            <h3>Provider Platforms</h3>
            <p>
              Select the platforms you provide services for.
            </p>

            <div className="platform-grid">
              {platforms.map((platform) => (
                <label
                  className="platform-option"
                  key={platform}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() =>
                      handlePlatformChange(platform)
                    }
                  />
                  <span>{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Complete Registration
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;