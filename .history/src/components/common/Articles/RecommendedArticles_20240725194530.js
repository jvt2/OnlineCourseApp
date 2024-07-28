// src/components/Articles/RecommendedArticles.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import useDashboardStyles from '../../../styles/dashboardstyles';
import { parseArticlesResponse } from '../../../utils/parsers'; // Import the specific parser
import '../../../styles/dashboardstyles.css'; // Assuming you use CSS modules

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 345,
    margin: 'auto',
    borderRadius: 'var(--border-radius)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--text-color)',
  },
  cardMedia: {
    height: 140,
    borderRadius: '8px 8px 0 0',
  },
  articleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardContent: {
    padding: 'var(--spacing-unit)',
  },
}));

function RecommendedArticles() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector(state => state.user.id);
  const token = useSelector(state => state.user.token);
  
  useEffect(() => {
    console.log('useEffect triggered:', { userId, token });

    const fetchRecommendedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}/recommended-articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const parsedAticles = parseArticlesResponse(response.data);
        setArticles(parsedAticles.slice(0,5));
      } catch (error) {
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
    <Box p={4} bgcolor="background.paper" minHeight="100vh" className="recommendations-container">
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
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={classes.articleLink}>
                    {article.title}
                  </a>
                </Typography>
                <Typography variant="body1">
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