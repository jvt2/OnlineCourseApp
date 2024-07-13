import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktopMenu: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.user ? state.user.loggedIn : false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" className={classes.title}>
          <Button color="inherit" component={RouterLink} to='/courses' className={classes.button}>Course Catalog</Button>
        </Typography>
        <div className={classes.desktopMenu}>
          {loggedIn ? (
            <>
              <Button color="inherit" component={RouterLink} to='/dashboard' className={classes.button}>Your Dashboard</Button>
              <Button color="inherit" component={RouterLink} to='/logout' className={classes.button}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to='/register' className={classes.button}>Register</Button>
              <Button color="inherit" component={RouterLink} to='/login' className={classes.button}>Login</Button>
            </>
          )}
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={classes.mobileMenu}
        >
          <MenuItem onClick={handleMenuClose} component={RouterLink} to='/courses'>Course Catalog</MenuItem>
          {loggedIn ? (
            <>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to='/dashboard'>Your Dashboard</MenuItem>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to='/logout'>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to='/register'>Register</MenuItem>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to='/login'>Login</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

