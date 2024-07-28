// LandingPage component for the sign-in page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logIn } from '../../redux/reducers/userSlice'; // Correct import path
import '../../components/common/LandingPage.css'; // Updated path


function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: Password input
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/check-email', { email });
      if (response.status === 200) {
        setStep(2); // Move to the password input step
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmailError('Email not found.');
      } else {
        setEmailError('An error occurred. Please try again.');
      }
    }
  };

  const handleBack = () => {
    setStep(1); // Go back to the email input step
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const { token, user } = response.data;
      alert(response.data.message);

      // Store token and navigate to dashboard or another page
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Dispatch the logIn action
      dispatch(logIn({ id: user.id, email: user.email, token: user.token }));

      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/parent_flux.png`} alt="Flux Logo" className="logo" />
        <h1>Sign in</h1>
        <p className="subtitle">Time to Flux</p>
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
            {emailError && <div className="email-error">{emailError}</div>}
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
            <button className="back-button" onClick={handleBack}>Back</button>
            <button className="continue-button" onClick={handleLogin}>Login</button>
          </>
        )}
        <p className="sign-up-link">No account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default LandingPage;
