// src/components/Articles/RecommendedArticles.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import useDashboardStyles from '../../../styles/dashboardstyles';
import { parseArticlesResponse } from '../../../../server/server';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
  },
  cardMedia: {
    height: 140,
    borderRadius: '8px 8px 0 0',
  },
  articleLink: {
    textDecoration: 'none',
    color: 'inherit',
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
    console.log('useEffect triggered:', { userId, token });

    const fetchRecommendedArticles = async () => {
      try {
        console.log('Fetching recommended articles for userId:', userId);
        const response = await axios.get(`http://localhost:3001/user/${userId}/recommended-articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const parsedArticles = parseArticlesResponse(response.data);
        console.log('Fetched recommended articles:', response.data);
        setArticles(parsedArticles.slice(0,5));
      } catch (error) {
        console.error('Error fetching recommended articles:', error);
        setError('Error fetching recommended articles');
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    if (userId && token) {
      fetchRecommendedArticles();
    } else {
      console.log('Missing userId or token:', { userId, token });
      setLoading(false);
    }
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
            <Card key={index} className={classes.card}>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className={classes.cardMedia}
                />
              )}
              <CardContent className={dashboardClasses.cardContent}>
                <Typography variant="h6" className={dashboardClasses.cardTitle}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={classes.articleLink}>
                    {article.title}
                  </a>
                </Typography>
                <Typography variant="body1" className={dashboardClasses.cardDescription}>
                  {article.description}
                </Typography>
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