import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const DesktopMenu = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const MobileMenu = styled(Menu)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

function Navbar() {
  const loggedIn = useSelector((state) => (state.user ? state.user.loggedIn : false));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MobileMenuButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </MobileMenuButton>
        <Title variant="h6" component="div">
          <StyledButton color="inherit" component={RouterLink} to="/courses">
            Course Catalog
          </StyledButton>
        </Title>
        <DesktopMenu>
          {loggedIn ? (
            <>
              <StyledButton color="inherit" component={RouterLink} to="/dashboard">
                Your Dashboard
              </StyledButton>
              <StyledButton color="inherit" component={RouterLink} to="/logout">
                Logout
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton color="inherit" component={RouterLink} to="/register">
                Register
              </StyledButton>
              <StyledButton color="inherit" component={RouterLink} to="/login">
                Login
              </StyledButton>
            </>
          )}
        </DesktopMenu>
        <MobileMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose} component={RouterLink} to="/courses">
            Course Catalog
          </MenuItem>
          {loggedIn ? (
            <>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/dashboard">
                Your Dashboard
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/logout">
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/register">
                Register
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/login">
                Login
              </MenuItem>
            </>
          )}
        </MobileMenu>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
