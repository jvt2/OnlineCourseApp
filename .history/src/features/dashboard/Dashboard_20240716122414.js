// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Correct import for CSS

function Dashboard() {
  const [articles, setArticles] = useState([]);
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}/articles`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
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
      <Box className="sidebar">
        <div className="sidebar-blur"></div>
        <div className="sidebar-main">
          <Typography className="sidebar-logo">Welcome</Typography>
          <div className="sidebar-icon icon-home" onClick={() => navigate('/dashboard')}></div>
          <div className="sidebar-icon icon-graduation"></div>
          <div className="sidebar-icon icon-user" ></div> {/* Update navigation */}
          <div className="sidebar-icon icon-search" onClick={() => navigate('/courses')}></div>
          <div className="sidebar-icon icon-settings"></div>
          <div className="sidebar-icon icon-logout"></div>
        </div>
      </Box>
      <Box className="dashboard-container">
        <Typography className="dashboard-header" variant="h4" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        
        <Box className="enrolled-courses-container">
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
        <Box className="button-container">
          <Button variant="contained" color="primary" onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
        </Box>
      </Box>
      <Box className="dashboard-container">
        <Typography className="dashboard-header" variant="h4" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Box className="articles-container">
          <Typography variant="h5" gutterBottom>
            Recommended Articles
          </Typography>
          {articles.length > 0 ? (
            <List>
              {articles.map((article, index) => (
                <ListItem key={index}>
                  <ListItemText primary={article.title} secondary={article.description} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No articles available.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
