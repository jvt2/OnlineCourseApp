import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <img src="/path/to/your/image.png" alt="Localshop" className="hero-image" />
        <h1>Localshop</h1>
        <p>Everything you need is in one place</p>
        <p>Find your daily necessities at Brand. The world's largest fashion e-commerce has arrived in a mobile. Shop now!</p>
        <div className="button-group">
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
          <button className="register-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
