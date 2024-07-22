// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import SideSection from './SideSection';

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.id);
  const userEmail = useSelector(state => state.user.email);
  const navigate = useNavigate();

  console.log('Dashboard component rendered with:', { userId, token, userEmail });

  useEffect(() => {
    console.log('useEffect triggered:', { userId, token });

    const fetchArticles = async () => {
      try {
        console.log('Fetching articles for userId:', userId);
        const response = await axios.get(`http://localhost:3001/user/${userId}/articles`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched articles:', response.data);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        console.log('Fetching enrolled courses for userId:', userId);
        const response = await axios.get(`http://localhost:3001/user/${userId}/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched enrolled courses:', response.data);
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    if (userId && token) {
      fetchArticles();
      fetchEnrolledCourses();
    } else {
      console.log('Missing userId or token:', { userId, token });
    }
  }, [userId, token]);

  return (
    <div className="container">
      <Box className="sidebar">
        <div className="sidebar-main">
          <Typography className="sidebar-logo">Flux</Typography>
          <div className="sidebar-icon icon-home" tabIndex="0" onClick={() => navigate('/dashboard')}></div>
          <div className="sidebar-icon icon-graduation" tabIndex="0"></div>
          <div className="sidebar-icon icon-user" tabIndex="0" onClick={() => navigate('/courses')}></div>
          <div className="sidebar-icon icon-search" tabIndex="0"></div>
          <div className="sidebar-icon icon-logout" onClick={() => navigate('/logout')}></div>
        </div>
      </Box>
      <Box className="dashboard-container">
        <Typography className="dashboard-header" variant="h4" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopSection />
          </Grid>
          <Grid item xs={12} md={8}>
            <MiddleSection />
            <BottomSection />
          </Grid>
          <Grid item xs={12} md={4}>
            <SideSection />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;