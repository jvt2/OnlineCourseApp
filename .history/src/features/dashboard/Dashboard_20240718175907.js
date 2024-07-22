// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';

// Import or define the TopSection component
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import SideSection from './SideSection';

import RecommendedArticles from '../../components/common/Articles/RecommendedArticles';

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = useSelector(state => state.user.token);
  const userId = useSelector(state => state.user.id);
  const userEmail = useSelector(state => state.user.email);
  const navigate = useNavigate();

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

    fetchArticles();
    fetchEnrolledCourses();
  }, [userId, token]);

  return (
    <div className="container">
      <Box className="sidebar">
        <div className="sidebar-main">
          <Typography className="sidebar-logo">F.</Typography>
          <div className="sidebar-icon icon-home" tabIndex="0" onClick={() => navigate('/dashboard')}></div>
          <div className="sidebar-icon icon-graduation" tabIndex="0"></div>
          <div className="sidebar-icon icon-user" tabIndex="0" onClick={() => navigate('/courses')}></div>
          <div className="sidebar-icon icon-search" tabIndex="0"></div>
          <div className="sidebar-icon icon-logout" tabIndex="0"></div>
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