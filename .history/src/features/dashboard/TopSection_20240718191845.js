// src/features/dashboard/TopSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import LearningHoursChart from '../../components/common/Charts/LearningHoursChart';

function TopSection() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome, [User Name]!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <LearningHoursChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TopSection;
