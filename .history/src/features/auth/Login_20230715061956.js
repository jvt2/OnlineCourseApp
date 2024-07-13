import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/reducers/userslice'; // Import the logIn action

function Login( { onLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the server with the username and password
      const response = await axios.post(`${apiUrl}/login`, { username, password });

      // Handle response (store the toekn and redirect the user)
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token in local storage
      dispatch(logIn({ name: username })); // Dispatch the logIn action
      navigate('/dashboard'); //Redirecting to dashboard
    } catch (error) {
      // Display error
      setError(' Login failed. Please check your username and password.');
      console.error(error);
    }
    dispatch(logIn({ name: username })); // Dispatch the logIn action

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      
      <input type="submit" value="Log in" />

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default Login;

// This component uses React's useState hook to keep track of the username. When the form is submitted, it prevents the page from refreshing (which is the default behavior of forms) and shows an alert with the username.
// In this code, { onLogin } in the function definition of Login is destructuring onLogin from the props that are passed to the Login component. This allows you to use onLogin directly in the handleSubmit function.

// Remember to pass the handleLogin function as a prop when you use the Login component in the App component:
// You can create a new file called Login.js in your src directory and paste this code there. Then, you can include this component in your App.js file to see it in action.