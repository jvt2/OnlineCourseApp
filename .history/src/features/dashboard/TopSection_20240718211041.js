// src/features/dashboard/TopSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import LearningHoursChart from '../../components/common/Charts/LearningHoursChart';
import useDashboardStyles from '../../styles/dashboardstyles'; // Ensure correct casing

function TopSection() {
  const classes = useDashboardStyles();

  return (
    <Box className={classes.section}>
      <Typography className={classes.header} gutterBottom>
        Welcome, [User Name]!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <LearningHoursChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TopSection;
