import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/userReducer'; // Ensure the path is correct
import '../../components/common/LandingPage.css'; // Updated path


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', { username, password, email });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch(logIn({ email, token })); // Dispatching both email and token
      navigate('/dashboard'); // Navigate to dashboard after successful registration
    } catch (error) {
      setError('Registration failed. Please check your details and try again.');
      console.error(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/flux_logo.png`} alt="Flux Logo" className="logo" />
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
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p className="sign-up-link">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}

export default Register;
