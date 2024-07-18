// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Correct import for CSS

function Dashboard() {
  const [articles, setArticles] = useState([]);
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

    fetchArticles();
  }, [userId, token]);

  return (
    <Container component="main" maxWidth="md">
      <Box className="sidebar">
        <div className="sidebar-blur"></div>
        <div className="sidebar-main">
          <Typography className="sidebar-logo">Welcome</Typography>
          <div className="sidebar-icon icon-home" onClick={() => navigate('/dashboard')}></div>
          <div className="sidebar-icon icon-graduation"></div>
          <div className="sidebar-icon icon-user" onClick={() => navigate('/courses')}></div>
          <div className="sidebar-icon icon-search"></div>
          <div className="sidebar-icon icon-settings"></div>
          <div className="sidebar-icon icon-logout"></div>
        </div>
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
