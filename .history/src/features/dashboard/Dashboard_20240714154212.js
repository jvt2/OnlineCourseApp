// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Ensure this is the correct path to your CSS file

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.id);
  const userEmail = useSelector(state => state.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

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

    fetchEnrolledCourses();
    fetchRecommendations();
  }, [userId, token]);

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
    <Container component="main" maxWidth="md">
      <Box className="dashboard-container" sx={{ mt: 8 }}>
        <Typography className="dashboard-header" variant="h4" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Box className="upload-container" sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Upload Your Resume
          </Typography>
          <input
            type="file"
            onChange={handleResumeUpload}
            accept=".pdf,.doc,.docx,.txt"
            style={{ margin: '20px 0' }}
          />
        </Box>
        <Box className="recommendations-container" sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Course Recommendations
          </Typography>
          {recommendations.length > 0 ? (
            <List>
              {recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemText primary={rec.title} secondary={rec.description} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">Upload your resume to get course recommendations.</Typography>
          )}
        </Box>
        <Box className="enrolled-courses-container" sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Enrolled Courses
          </Typography>
          {enrolledCourses.length > 0 ? (
            <List>
              {enrolledCourses.map(course => (
                <ListItem key={course.id}>
                  <ListItemText primary={course.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">You are not enrolled in any courses.</Typography>
          )}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
