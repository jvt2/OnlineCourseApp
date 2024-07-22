// src/components/Articles/RecommendedArticles.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import useDashboardStyles from '../components/common/styles/dashboardstyles';

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 140,
    borderRadius: '8px 8px 0 0',
  },
}));
function RecommendedArticles() {
  const classes = useStyles();
  const dashboardClasses = useDashboardStyles();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchRecommendedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}/recommended-articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data);
      } catch (error) {
        setError('Error fetching recommended articles');
        console.error('Error fetching recommended articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedArticles();
  }, [userId, token]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box p={4} bgcolor="background.paper" minHeight="100vh">
      <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
        Recommended Articles
      </Typography>
      {articles.length > 0 ? (
        <Carousel>
          {articles.map((article, index) => (
            <Card key={index} className={dashboardClasses.card}>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className={classes.cardMedia}
                />
              )}
              <CardContent className={dashboardClasses.cardContent}>
                <Typography variant="h6" className={dashboardClasses.cardTitle}>
                  {article.title}
                </Typography>
                <Typography variant="body1" className={dashboardClasses.cardDescription}>
                  {article.description}
                </Typography>
                {article.link && (
                  <Typography variant="body2">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      Read more
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="textSecondary">No recommendations available.</Typography>
      )}
    </Box>
  );
}

export default RecommendedArticles;
