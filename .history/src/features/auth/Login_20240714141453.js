// src/features/auth/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/userReducer'; // Ensure the path is correct
import './LandingPage.css'; // Ensure this path is correct

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch(logIn({ email, token })); // Dispatching both email and token
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error(error);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/flux_logo.png`} alt="Flux Logo" className="logo" />
        <h1>Sign in</h1>
        <p className="subtitle">to continue to Galileo AI</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p className="sign-up-link">No account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;



// This component uses React's useState hook to keep track of the username. When the form is submitted, it prevents the page from refreshing (which is the default behavior of forms) and shows an alert with the username.
// In this code, { onLogin } in the function definition of Login is destructuring onLogin from the props that are passed to the Login component. This allows you to use onLogin directly in the handleSubmit function.

// Remember to pass the handleLogin function as a prop when you use the Login component in the App component:
// You can create a new file called Login.js in your src directory and paste this code there. Then, you can include this component in your App.js file to see it in action.