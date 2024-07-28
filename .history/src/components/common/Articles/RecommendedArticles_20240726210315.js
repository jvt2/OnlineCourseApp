// src/components/Articles/RecommendedArticles.js
// src/components/Articles/RecommendedArticles.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import { parseArticlesResponse } from '../../../utils/parsers'; // Ensure this import is correct
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
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const loadArticles = () => {
      const storedData = localStorage.getItem(`articles_${userId}`);
      if (storedData) {
        const { articles, timestamp } = JSON.parse(storedData);
        const twentyHours = 20 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now - timestamp < twentyHours) {
          console.log('Loaded articles from localStorage:', articles);
          setArticles(articles);
          setLoading(false);
          return;
        }
      }
      fetchRecommendedArticles();
    };

    const fetchRecommendedArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}/recommended-articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response.data);
        const parsedArticles = parseArticlesResponse(response.data);
        console.log('Parsed articles:', parsedArticles);
        const dataToStore = {
          articles: parsedArticles.slice(0, 5),
          timestamp: new Date().getTime(),
        };
        setArticles(dataToStore.articles);
        localStorage.setItem(`articles_${userId}`, JSON.stringify(dataToStore));
      } catch (error) {
        console.error('Error fetching recommended articles:', error);
        setError('Error fetching recommended articles');
      } finally {
        setLoading(false);
      }
    };
    const refreshArticles = async () => {
      const newArticles = await fetchRecommendedArticles();
      setArticles(newArticles);
      localStorage.setItem('recommendedArticles', JSON.stringify(newArticles));
    };
  


    if (userId && token) {
      loadArticles();
    } else {
      setLoading(false);
    }
    
    // Automatically refresh articles if they are older than 20 hours
    const interval = setInterval(() => {
      const storedData = localStorage.getItem(`articles_${userId}`);
      if (storedData) {
        const { timestamp } = JSON.parse(storedData);
        const twentyHours = 20 * 60 * 60 * 1000;
        const now = new Date().getTime();
        if (now - timestamp >= twentyHours) {
          refreshArticles();
        }
      }
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval); // Clean up interval on component unmount

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
      <Button variant="contained" color="primary" onClick={refreshArticles} className={classes.refreshButton}>
        Refresh Articles
      </Button>
    </Box>
  );
};

export default RecommendedArticles;
