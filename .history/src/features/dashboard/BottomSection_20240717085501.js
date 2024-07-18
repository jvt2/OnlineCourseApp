// src/features/dashboard/BottomSection.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import NewCourses from '../../components/Courses/NewCourses';
import TrendingCourses from '../../components/Courses/TrendingCourses';

function BottomSection() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Suggested Courses</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <NewCourses />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendingCourses />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BottomSection;
