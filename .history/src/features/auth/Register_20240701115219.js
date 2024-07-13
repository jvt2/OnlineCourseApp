import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3002/register', { username, password });
      dispatch(logIn({ name: username }));
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { color: '#ff7e5f' } }}  // Adjust label color
            InputProps={{ style: { color: '#fff', backgroundColor: '#fff' } }} // Adjust input box style
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#ff7e5f' } }}  // Adjust label color
            InputProps={{ style: { color: '#fff', backgroundColor: '#fff' } }} // Adjust input box style
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
