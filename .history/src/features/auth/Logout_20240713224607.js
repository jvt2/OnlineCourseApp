// Logout.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/reducers/userslice'; // Import the logOut action

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('token'); // Remove the token from local storage
    dispatch(logOut()); // Dispatch the logOut action
    navigate('/login'); // Navigate to the login page
  }, [dispatch, navigate]);

  return null;
}

export default Logout;
