// src/features/courses/CourseRecommendations.js
import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';


const CourseImage = styled(CardMedia)({
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
      <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
        Recommended for you
      </Typography>
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((course, index) => (
          <Card key={index} elevation={3} sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={1} color="secondary">
                {course.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">No recommendations available.</Typography>
      )}
      <Button variant="outlined" fullWidth>
        View more recommendations
      </Button>
    </Box>
  );
}

export default CourseRecommendations;