import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  spacing: 8, // Or any other value or function you want to define
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default theme;
