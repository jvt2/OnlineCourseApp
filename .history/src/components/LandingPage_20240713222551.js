import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css'; // Ensure this path is correct

function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: Password input
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleContinue = async () => {
    // Here, you might want to validate the email format before proceeding
    setStep(2); // Move to the password input step
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      alert(response.data.message);
      // Store token and navigate to dashboard or another page
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/flux_logo.png`} alt="Flux Logo" className="logo" />
        <h1>Sign in</h1>
        <p className="subtitle">to continue to Galileo AI</p>
        {step === 1 && (
          <>
            <button className="google-sign-in">
              <img src={`${process.env.PUBLIC_URL}/assets/google-logo.png`} alt="Google" className="google-logo" />
              Continue with Google
            </button>
            <div className="separator">
              <span>or</span>
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="email-input"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="continue-button" onClick={handleContinue}>Continue</button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="password-input"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="continue-button" onClick={handleLogin}>Login</button>
          </>
        )}
        <p className="sign-up-link">No account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default LandingPage;
