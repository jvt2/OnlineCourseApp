// src/features/dashboard/TopSection.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LearningHoursChart from '../../components/Charts/LearningHoursChart';


function TopSection() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome, [User Name]!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <LearningHoursChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TopSection;
