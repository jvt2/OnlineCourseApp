// src/styles/dashboardStyles.js
import { makeStyles } from '@mui/styles';

const useDashboardStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(2),
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardMedia: {
    height: 140,
    borderRadius: '8px 8px 0 0',
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
  },
  cardDescription: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  welcomeText: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default useDashboardStyles;
