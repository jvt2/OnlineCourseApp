// Navbar.
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const loggedIn = useSelector(state => state.user.loggedIn);

  console.log('loggedIn:', loggedIn);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to='/courses'>Course Catalog</Button>
        </Typography>
        {loggedIn ? (
          <>
            {/* The user is logged in, show the dashboard and logout options */}
            <Button color="inherit" component={RouterLink} to='/dashboard'>Your Dashboard</Button>
            <Button color="inherit" component={RouterLink} to='/logout'>Logout</Button>
          </>
        ) : (
          <>
            {/* The user is not logged in, show the register and login options */}
            <Button color="inherit" component={RouterLink} to='/register'>Register</Button>
            <Button color="inherit" component={RouterLink} to='/login'>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
