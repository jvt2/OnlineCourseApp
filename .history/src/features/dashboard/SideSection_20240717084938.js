// src/features/dashboard/SideSection.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CommunityActivity from '../../components/UserEngagement/CommunityActivity';
import MessagesNotifications from '../../components/UserEngagement/MessagesNotifications';
import CareerPathRecommendations from '../../components/Recommendations/CareerPathRecommendations';
import SkillDevelopment from '../../components/Recommendations/SkillDevelopment';

function SideSection() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Engagement</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CommunityActivity />
        </Grid>
        <Grid item xs={12}>
          <MessagesNotifications />
        </Grid>
        <Grid item xs={12}>
          <CareerPathRecommendations />
        </Grid>
        <Grid item xs={12}>
          <SkillDevelopment />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SideSection;
