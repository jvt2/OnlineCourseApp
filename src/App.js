import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail'; 
import UserDashboard from './components/Dashboard';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [courses, setCourses] = useState([
    {id: 1, name: 'Course 1', description: 'This is course 1'},
    {id: 2, name: 'Course 2', description: 'This is course 2'}
  ]);
  
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleLogin = (username, password) => {
    // For now, we'll "Log in" any user with any username and password
    setLoggedIn(true);
  };
  
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  function CourseDetail({ course }) {
    // If course is undefined, return null
    if (!course){
      return null;
    }
  }

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // Replace this with the selected course from the Course Catalog

  const handleEnroll = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };


  // Pass handleLogin as a prop to the Login component
  <Login onLogin={handleLogin} />


  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/courses'>Course Catalog</Link></li>
        <li><Link to='/dashboard'>Your Dashboard</Link></li>
        </ul>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {selectedCourse && <CourseDetail course={selectedCourse} />}

        <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
        
        <Route path='/courses' element={<CourseCatalog courses={courses} onCourseClick={handleCourseClick}/>}/>    

        <Route path='/course/:id' element={<CourseDetail course={selectedCourse} onEnroll={handleEnroll} />}/>
      
        <Route path='/dashboard' element={<UserDashboard courses={enrolledCourses} />}/>
        </Routes>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Router>
  );
}

export default App;

// In this version of App.js, we've added the Login, CourseCatalog, CourseDetail, and UserDashboard components to the render method. We've also added a piece of state enrolledCourses to keep track of the courses that the user is enrolled in.

// The handleEnroll function is passed as a prop to the CourseDetail component. When called, it adds the selected course to the enrolledCourses array.

// The enrolledCourses array is passed as a prop to the UserDashboard component, which will display the list of enrolled courses.

// Please replace the selectedCourse with the actual selected course from the CourseCatalog as per your application's logic.
