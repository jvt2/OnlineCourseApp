// src/features/dashboard/SideSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import CareerPathRecommendations from '../../components/common/Recommendations/CareerPathRecommendations';
import SkillDevelopment from '../../components/common/Recommendations/SkillDevelopment';

function SideSection() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Engagement</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CareerPathRecommendations />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <SkillDevelopment />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SideSection;
