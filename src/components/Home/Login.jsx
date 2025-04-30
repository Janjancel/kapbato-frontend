import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Make sure to create a Login.css file for styling

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token); // Store token for authentication
      navigate('/dashboard'); // Redirect to dashboard or another page
    } else {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span onClick={() => navigate('/register')} className="link">Register here</span></p>
    </div>
  );
}
