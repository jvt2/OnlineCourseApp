// src/components/Articles/RecommendedArticles.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardActionArea, CircularProgress, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import '../../../features/dashboard/Dashboard.css'; // Importing the CSS file

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
  refreshButton: {
    marginTop: '16px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const RecommendedArticles = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const fetchRecommendedArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}/recommended-articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response:', response.data);

      // Ensure response data is an array
      if (response.data.articles) {
        setArticles(response.data.articles.slice(0, 5));
      } else {
        setError('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error fetching recommended articles:', error);
      setError('Error fetching recommended articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchRecommendedArticles();
    } else {
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
              <CardActionArea href={article.link} target="_blank" rel="noopener noreferrer" className={classes.articleLink}>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className={classes.cardMedia}
                  />
                )}
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="textSecondary">No recommendations available.</Typography>
      )}
      <Button variant="contained" color="primary" onClick={fetchRecommendedArticles} className={classes.refreshButton}>
        Refresh Articles
      </Button>
    </Box>
  );
};

export default RecommendedArticles;
