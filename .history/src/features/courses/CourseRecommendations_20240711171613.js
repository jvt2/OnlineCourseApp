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

function processRecommendations(recommendations) {
  return recommendations
    .filter(item => item && item.text)  // Filter out any invalid or empty entries
    .map(item => {
      if (typeof item.text === 'string') {
        return item.text; // Return the text if it's a string
      } else if (item.text && item.text.text) {
        return item.text.text; // Return the nested text if it's an object
      }
      return ''; // Fallback to an empty string if none of the above conditions are met
    })
    .filter(text => text.trim() !== ''); // Filter out any empty strings
}

// Example usage with the recommendations array
const recommendations = [
  { id: 0, text: { id: 0, text: '1. Advanced Machine Learning: This course will help Andrew deepen his understanding of machine learning concepts and algorithms, allowing him to stay at the forefront of advancements in the field. It will also provide him with the knowledge and skills needed to tackle more complex machine learning challenges in his current and future roles.' }},
  { id: 1, text: { id: 1, text: '' }},
  { id: 2, text: { id: 2, text: '2. Cloud Computing: This course will help Andrew understand cloud infrastructure and services, which are essential skills for modern software development.' }},
  { id: 3, text: { id: 3, text: '' }},
  { id: 4, text: { id: 4, text: '3. Cybersecurity for Machine Learning Systems: With the increasing importance of securing machine learning models, this course will teach Andrew how to protect machine learning systems from security threats and attacks.' }}
];

const processedRecommendations = processRecommendations(recommendations);
console.log(processedRecommendations);


function CourseRecommendations({ recommendations, onSelect }) {
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
                {typeof course.text === 'string' ? course.text : course.text?.text ? course.text.text : 'No title available'}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => onSelect(course)}>
                Select
              </Button>
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