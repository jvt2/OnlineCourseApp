// src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../components/common/LandingPage.css';

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = useSelector(state => state.user.token); // Get token from Redux state
  const userId = useSelector(state => state.user.id); // Get user ID from Redux state
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

    fetchEnrolledCourses();
  }, [userId, token]);

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Your Courses
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
          <>
            <Typography variant="body1">
              You are not enrolled in any courses.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
