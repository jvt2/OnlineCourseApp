import React, { useState } from 'react';

function Login( { onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onlogin prop with the current username and password
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>
        Password:
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      </label>
      <input type="submit" value="Log in" />
    </form>
  );
}

export default Login;

// This component uses React's useState hook to keep track of the username. When the form is submitted, it prevents the page from refreshing (which is the default behavior of forms) and shows an alert with the username.
// In this code, { onLogin } in the function definition of Login is destructuring onLogin from the props that are passed to the Login component. This allows you to use onLogin directly in the handleSubmit function.

// Remember to pass the handleLogin function as a prop when you use the Login component in the App component:
// You can create a new file called Login.js in your src directory and paste this code there. Then, you can include this component in your App.js file to see it in action.