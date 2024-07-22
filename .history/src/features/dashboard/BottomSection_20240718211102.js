// src/features/dashboard/BottomSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import useDashboardStyles from '../../styles/dashboardstyles'; // Ensure correct casing

function BottomSection() {
  const classes = useDashboardStyles();

  return (
    <Box className={classes.section}>
      <Typography className={classes.sectionTitle} gutterBottom>
        Suggested Courses
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="div" className={classes.cardTitle}>
                Course Title
              </Typography>
              <Typography variant="body2" color="text.secondary" className={classes.cardDescription}>
                Brief description of the course.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="div" className={classes.cardTitle}>
                Course Title
              </Typography>
              <Typography variant="body2" color="text.secondary" className={classes.cardDescription}>
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

