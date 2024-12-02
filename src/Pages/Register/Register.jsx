import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);  // Set loading to true when the request starts

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);  // Set loading to false after validation error
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      window.location.href = '/login';  // Redirect after successful registration
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);  // Set loading to false after request completes
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
