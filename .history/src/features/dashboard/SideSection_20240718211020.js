// src/features/dashboard/SideSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import CareerPathRecommendations from '../../components/common/Recommendations/CareerPathRecommendations';
import SkillDevelopment from '../../components/common/Recommendations/SkillDevelopment';
import useDashboardStyles from '../../styles/dashboardstyles'; // Ensure correct casing

function SideSection() {
  const classes = useDashboardStyles();

  return (
    <Box className={classes.section}>
      <Typography className={classes.sectionTitle} gutterBottom>
        User Engagement
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <CareerPathRecommendations />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <SkillDevelopment />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SideSection;

