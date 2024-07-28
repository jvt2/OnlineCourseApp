import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Register from '../features/auth/Register';
import CourseCatalog from '../features/courses/CourseCatalog';
import Dashboard from '../features/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from '../redux/store'; // import your Redux store here
import Logout from '../features/auth/Logout'; // Import the Logout component
import LandingPage from '../components/common/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const passport = require('passport');
require('./passport-config')(passport); 

function App() {
  const [courses, setCourses] = useState([
    {id: 1, name: 'Course 1', description: 'This is course 1'},
    {id: 2, name: 'Course 2', description: 'This is course 2'}
  ]);


  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* Added this line */}
              <Route path='/courses' element={<CourseCatalog courses={courses}/>}/>    
              <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
