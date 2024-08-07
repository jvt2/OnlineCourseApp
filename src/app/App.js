import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../logo.svg';
import './App.css';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import CourseCatalog from '../features/courses/CourseCatalog';
import CourseDetail from '../features/courses/CourseDetail'; 
import UserDashboard from '../features/dashboard/Dashboard';
import Navbar from '../components/common/Navbar';
import { Provider } from 'react-redux';
import store from '../redux/store'; // import your Redux store here
import Logout from '../features/auth/Logout'; // Import the Logout component
import Chatbot from '../features/chatbot/Chatbot';
import CourseRecommendations from '../features/courses/CourseRecommendations';
import axios from 'axios';
import ResumeUpload from '../features/courses/ResumeUpload';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  
  const handleResumeUpload = (newRecommendations) => {
    console.log('New Recommendations:', newRecommendations);
    setRecommendations(newRecommendations);
  };

  const [courses, setCourses] = useState([
    {id: 1, name: 'Course 1', description: 'This is course 1'},
    {id: 2, name: 'Course 2', description: 'This is course 2'}
  ]);

  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/register', { username, password });
      alert(response.data.message);
      // Log in the new user if registration is successful
      handleLogin(username, password);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      setCurrentUser({ username });
    } catch (error) {
      alert('Login failed. Please check your username and password.');
    }
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

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectRecommendation = (recommendation) => {
    const newCourse = {
      id: courses.length + 1,
      name: recommendation.text,
      description: 'This is a recommended course based on your resume.'
    };
  
    setCourses([...courses, newCourse]);
    setEnrolledCourses([...enrolledCourses, newCourse]);
    setIsModalOpen(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Chatbot />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <Routes>
              <Route exact path='/' element={<UserDashboard courses={enrolledCourses} />}/>
              <Route path='/dashboard/:userId' element={<UserDashboard courses={enrolledCourses} />}/>
              <Route path='/register' element={<Register onRegister={handleRegister}/>}/>
              <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
              <Route path='/courses' element={<CourseCatalog courses={courses}/>}/>    
              <Route path='/course/:id' element={<CourseDetail courses={courses} onEnroll={handleEnroll} />}/>
              <Route path='/dashboard' element={<UserDashboard courses={enrolledCourses} />}/>
              <Route path='/logout' element={<Logout />} />
              <Route path='/recommendations' element={<CourseRecommendations recommendations={recommendations} onSelect={handleSelectRecommendation} />} />
              <Route path='/resume-upload' element={<ResumeUpload setCourseRecommendations={handleResumeUpload} />} />
            </Routes>
          
            <p>
              <code>Website under construction</code>.
            </p>
            <a
              className="App-link"
              href="https://fluxsquared.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flux Squared
            </a>
          </header>
    
        </div>
      </Router>
    </Provider>
  );
}

export default App;
