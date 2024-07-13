// Navbar.js 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logOut } from '../../redux/actions';

function Navbar() {
  const loggedIn = useSelector(state => state.user ? state.user.loggedIn : false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  console.log('loggedIn:', loggedIn);
  console.log('Type of loggedIn:', typeof loggedIn);


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
