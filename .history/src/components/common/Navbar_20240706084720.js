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

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const DesktopMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const Navbar = () => {
  const loggedIn = useSelector(state => state.user?.loggedIn);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {isMobile && (
          <MobileMenuButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </MobileMenuButton>
        )}
        <Title variant="h6">
          <StyledButton color="inherit" component={RouterLink} to="/courses">
            Course Catalog
          </StyledButton>
        </Title>
        {!isMobile && (
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
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
