// src/features/dashboard/BottomSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

function BottomSection() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Suggested Courses</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Course Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brief description of the course.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Course Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brief description of the course.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BottomSection;
