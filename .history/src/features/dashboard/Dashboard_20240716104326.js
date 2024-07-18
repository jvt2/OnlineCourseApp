// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.id);
  const userEmail = useSelector(state => state.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, [userId, token]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}/recommendations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleResumeUpload = async (event) => {
    const formData = new FormData();
    formData.append('resume', event.target.files[0]);

    try {
      const response = await axios.post('http://localhost:3001/uploadResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <div>
      <Box className="sidebar">
        <Typography className="sidebar-logo">Welcome</Typography>
        <div className="sidebar-icon icon-home" onClick={() => navigate('/dashboard')}></div>
        <div className="sidebar-icon icon-user"></div>
        <div className="sidebar-icon icon-message"></div>
        <div className="sidebar-icon icon-logout"></div>
      </Box>
      <Container component="main" maxWidth="md" className="dashboard-content">
        <Typography variant="h4" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Box className="upload-container">
          <Typography variant="h5" gutterBottom>
            Upload Your Resume for Personalized Recommendations
          </Typography>
          <input type="file" onChange={handleResumeUpload} accept=".pdf,.doc,.docx,.txt" />
        </Box>
        <Box className="recommendations-container">
          <Typography variant="h5" gutterBottom>
            Recommended for You
          </Typography>
          {recommendations.length > 0 ? (
            <List>
              {recommendations.map((rec, index) => (
                <ListItem key={index} className="recommendation-item">
                  <ListItemText 
                    primary={<Typography className="recommendation-title">{rec.title}</Typography>}
                    secondary={<Typography className="recommendation-description">{rec.description}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Upload your resume or set your preferences to get personalized recommendations.</Typography>
          )}
        </Box>
        <Box className="button-container">
          <Button variant="contained" color="primary" onClick={() => navigate('/preferences')}>
            Set Your Preferences
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard;
