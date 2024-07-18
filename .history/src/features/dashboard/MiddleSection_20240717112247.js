// src/features/dashboard/MiddleSection.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import RecommendedArticles from '../../components/common/Articles/RecommendedArticles';

function MiddleSection() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Recommended Articles</Typography>
      <RecommendedArticles />
    </Box>
  );
}

export default MiddleSection;
