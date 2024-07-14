import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Ensure this path is correct

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <img src={`${process.env.PUBLIC_URL}/assets/flux_icon.png`} alt="Logo" className="logo" />
        <h1>Sign in</h1>
        <p className="subtitle">to continue to Galileo AI</p>
        <button className="google-sign-in">
          <img src={`${process.env.PUBLIC_URL}/assets/google-logo.png`} alt="Google" className="google-logo" />
          Continue with Google
        </button>
        <div className="separator">
          <span>or</span>
        </div>
        <input type="email" placeholder="Email address" className="email-input" />
        <button className="continue-button" onClick={() => navigate('/login')}>Continue</button>
        <p className="sign-up-link">No account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default LandingPage;
