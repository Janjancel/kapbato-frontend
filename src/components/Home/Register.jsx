import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Register.css'; // Make sure to create this file for styling

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user:', formData);
    // You can add an API call here to send data to the backend
    navigate('/'); // Redirect to homepage after registration
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <span onClick={() => navigate('/login')} className="login-link">Login here</span></p>
    </div>
  );
}
