// src/features/auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/userReducer';
import '../../components/common/LandingPage.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost:3001/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch(logIn({ email, token }));
      navigate('/dashboard');
    } catch (error) {
      setError('Registration failed. Please check your details and try again.');
      console.error(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/parent_flux.png`} alt="Flux Logo" className="logo" />
        <h1>Register</h1>
        <p className="subtitle">Keep Going</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file"
            className="input-field"
            accept="application/pdf" // Accept only PDF files
            onChange={(e) => setResume(e.target.files[0])}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p className="sign-up-link">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default Register;
