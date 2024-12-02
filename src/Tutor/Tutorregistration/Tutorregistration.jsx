import React, { useState } from 'react';
import './Tutorregistration.css';

const Tutorregistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'Computer Science', // Default value
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, department, phone, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                department,
                phone,
                password,
                confirmPassword
            });
            console.log('Registration successful:', response.data);
            // Redirect to login or handle success
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className='page'>
        <div className='tutorregistration'>
            <h2>Let's Shape the Future</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="phone">Phone No:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /><br /><br />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.com$" /><br /><br />
                
                <label htmlFor="department">Department:</label>
                <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Music">Music</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                </select><br /><br />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required pattern="(?=.*[a-zA-Z])(?=.*[@$!%*?&#]).{8,}" /><br /><br />

                <label htmlFor="confirmPassword">Re-enter Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required pattern="(?=.*[a-zA-Z])(?=.*[@$!%*?&#]).{8,}" /><br /><br />

                <button type="submit">Register</button>
            </form>
        </div>
        </div>
    )
}

export default Tutorregistration;
