// src/features/dashboard/MiddleSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import RecommendedArticles from '../../components/common/Articles/RecommendedArticles';
import useDashboardStyles from '../../styles/dashboardstyles';

function MiddleSection() {
  const classes = useDashboardStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5" gutterBottom>Recommended Articles</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              height="140"
              image="path/to/image.jpg"
              alt="Article Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Article Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brief description of the article.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <RecommendedArticles />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiddleSection;
