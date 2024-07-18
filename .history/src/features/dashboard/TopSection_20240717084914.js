// src/features/dashboard/TopSection.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LearningHoursChart from '../../components/Charts/LearningHoursChart';
import CourseProgress from '../../components/CourseProgress/CourseProgress';
import Achievements from '../../components/Achievements/Achievements';

function TopSection() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome, [User Name]!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <LearningHoursChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <CourseProgress />
        </Grid>
        <Grid item xs={12} md={4}>
          <Achievements />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TopSection;
