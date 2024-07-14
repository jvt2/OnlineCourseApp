import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Ensure this path is correct

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <img src={`${process.env.PUBLIC_URL}/assets/localshop.png`} alt="Localshop" className="hero-image" />
        <h1 className="hero-title">Localshop</h1>
        <p className="hero-subtitle">Everything you need is in one place</p>
        <p className="hero-description">
          Find your daily necessities at Brand. The world's largest fashion e-commerce has arrived in a mobile. Shop now!
        </p>
        <div className="button-group">
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
          <button className="register-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
