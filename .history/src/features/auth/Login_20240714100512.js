// src/features/auth/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/userslice'; // Updated import path

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch(logIn({ email, token })); // Dispatching both email and token
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default Login;



// This component uses React's useState hook to keep track of the username. When the form is submitted, it prevents the page from refreshing (which is the default behavior of forms) and shows an alert with the username.
// In this code, { onLogin } in the function definition of Login is destructuring onLogin from the props that are passed to the Login component. This allows you to use onLogin directly in the handleSubmit function.

// Remember to pass the handleLogin function as a prop when you use the Login component in the App component:
// You can create a new file called Login.js in your src directory and paste this code there. Then, you can include this component in your App.js file to see it in action.