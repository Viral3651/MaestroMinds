import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Tutorregistration.css";

const TutorRegistration = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    department: 'Computer Science'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    const { first_name, last_name, username, email, password, confirmPassword, phone_number, department } = formData;

        //error for password mismatch
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for empty fields
    if (!first_name || !last_name || !username || !email || !password || !confirmPassword || !phone_number || !department ) {
      setError("All fields are required");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid phone number
    if (!/^\d{10}$/.test(phone_number)) {
      setError("Invalid phone number format");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid password
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError("Password must be at least 8 characters long and contain at least one letter and one number");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid username
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError("Username can only contain letters and numbers");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid first name
    if (!/^[a-zA-Z]+$/.test(first_name)) {
      setError("First name can only contain letters");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for invalid last name
    if (!/^[a-zA-Z]+$/.test(last_name)) {
      setError("Last name can only contain letters");
      setLoading(false);  // Set loading to false after validation error
      return;
    }
    //error for creating an account that already exists
    //const existingUser = await axios.get(`http://localhost:5000/api/users?username=${username}&email=${email}`);
    //if (existingUser.data.exists) {
      //setError("User already exists");
      //setLoading(false);  // Set loading to false after validation error
      //return;
    //}

    try {
      const response = await axios.post('http://localhost:5000/api/tutorregistration', {
        first_name,
        last_name,
        username,
        email,
        password,
        phone_number,
        department
      });
      alert(response.data.message);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);  // Set loading to false when the request is complete
    }
  };

  return (
    <div className="page">
    <div className="tutor-registration-page">
      <h2>Let's Shape The Future</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
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
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Psychology">Psychology</option>
            <option value="Biology">Biology</option>
            <option value="Physics">Physics</option>
            <option value="Music">Music</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default TutorRegistration;
