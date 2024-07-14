import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <img src="\src\flux_icon.png" alt="Flux" className="hero-image" />
        <h1>FLUX Growth!</h1>
        <p>Unlock Your Potential: Upload & Get Matched to Perfect Courses</p>
        <p>To use our Flux Acelerator Please Register or Sign Up !</p>
        <div className="button-group">
          <button className="login-button" onClick={() => navigate('/login')}>Login</button>
          <button className="register-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
