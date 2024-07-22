import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../logo.svg';
import './App.css';
import Register from '../features/auth/Register';
import CourseCatalog from '../features/courses/CourseCatalog';
import CourseDetail from '../features/courses/CourseDetail'; 
import UserDashboard from '../features/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from '../redux/store'; // import your Redux store here
import Logout from '../features/auth/Logout'; // Import the Logout component
import Chatbot from '../features/chatbot/Chatbot';
import CourseRecommendations from '../features/courses/CourseRecommendations';
import axios from 'axios';
import ResumeUpload from '../features/courses/ResumeUpload';
import Dashboard from '../features/dashboard/Dashboard'; // Ensure the path is correct
import LandingPage from '../components/common/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [courses, setCourses] = useState([
    {id: 1, name: 'Course 1', description: 'This is course 1'},
    {id: 2, name: 'Course 2', description: 'This is course 2'}
  ]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResumeUpload = (newRecommendations) => {
    console.log('New Recommendations:', newRecommendations);
    setRecommendations(newRecommendations);
  };


  const handleEnroll = async (course) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/enroll', { courseId: course.id }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEnrolledCourses([...enrolledCourses, course]);
    } catch (error) {
      console.error('Enrollment failed', error);
    }
  };

  
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
              <Route path='/course/:id' element={<CourseDetail courses={courses} onEnroll={handleEnroll} />}/>
              <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
