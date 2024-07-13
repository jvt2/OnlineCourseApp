// src/features/courses/CourseRecommendations.js
import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

// const courses = [
//   {
//     title: 'The Complete Financial Analyst Course 2022',
//     students: '365K',
//     rating: '4.5',
//     image: 'https://cdn.usegalileo.ai/stability/dc754fa0-4933-48bc-95a0-a5625ec5d396.png',
//   },
//   {
//     title: 'Machine Learning A-Z: Hands-On Python & R In Data Science',
//     students: '370K',
//     rating: '4.6',
//     image: 'https://cdn.usegalileo.ai/stability/6bf450d1-5bd7-41bc-a556-45e4d9888394.png',
//   },
//   {
//     title: 'PMP Exam Prep Seminar - PMBOK Guide 6',
//     students: '300K',
//     rating: '4.7',
//     image: 'https://cdn.usegalileo.ai/stability/083b951e-a991-4599-b63e-acd9f89d9f24.png',
//   },
// ];

const CourseImage = styled(Box)({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '8px',
  width: '100%',
  height: 0,
  paddingBottom: '56.25%', // 16:9 aspect ratio
});

function CourseRecommendations({ recommendations }) {
  console.log('Rendering CourseRecommendations with props:', recommendations); // Log the props

  return (
    <Box p={4} bgcolor="background.paper" minHeight="100vh">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Recommended for you
      </Typography>
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((course, index) => (
          <Paper key={index} elevation={3} sx={{ mb: 3, p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <CourseImage sx={{ backgroundImage: `url(${course.image || 'https://via.placeholder.com/150'})` }} />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {course.title}
              </Typography>
              <Typography variant="body1">
                {course.description}
              </Typography>
            </Box>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No recommendations available.</Typography>
      )}
      <Button variant="outlined" fullWidth>
        View more recommendations
      </Button>
    </Box>
  );
}

export default CourseRecommendations;
