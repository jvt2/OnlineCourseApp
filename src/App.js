import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail'; 
import UserDashboard from './components/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store'; // import your Redux store here

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([
    {id: 1, name: 'Course 1', description: 'This is course 1'},
    {id: 2, name: 'Course 2', description: 'This is course 2'}
  ]);

  const handleRegister = (username, password) => {
    //Check if a user with the given username already exits
    if (users.some(user => user.username === username)) {
      alert('Username already taken');
      return;
    }
    // Add the new user to the users State
    setUsers([...users, {username, password}]);

    // Log in the new user
    setLoggedIn(true);
  };
  
  

  const handleLogin = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password)
    if (user) {
      setLoggedIn(true);
      setCurrentUser(user); // You'll need to add a new state for this
    } else {
      alert('Incorrect username or password');
    }
  };

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // replace this with the selected course from the course catalog 
   

  const handleEnroll = (course) => {
    // Check if the course is already in the enrolledCourses array
    if (!enrolledCourses.includes(course)) {
      //if not, add it to the array
      setEnrolledCourses([...enrolledCourses, course]);
    }
    
  };



  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <Routes>
              <Route exact path='/' element={<UserDashboard courses={enrolledCourses} />}/>
              <Route path='/dashboard/:userId' element={<UserDashboard courses={enrolledCourses} />}/>
              <Route path='/upload-resume' element={<ResumeUpload />} />
              <Route path='/register' element={<Register onRegister={handleRegister}/>}/>
              <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
              <Route path='/courses' element={<CourseCatalog courses={courses}/>}/>    
              <Route path='/course/:id' element={<CourseDetail courses={courses} onEnroll={handleEnroll} />}/>
              <Route path='/dashboard' element={<UserDashboard courses={enrolledCourses} />}/>
            </Routes>

            <p>
              <code>Website underconstruction</code> .
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

// In this version of App.js, we've added the Login, CourseCatalog, CourseDetail, and UserDashboard components to the render method. We've also added a piece of state enrolledCourses to keep track of the courses that the user is enrolled in.

// The handleEnroll function is passed as a prop to the CourseDetail component. When called, it adds the selected course to the enrolledCourses array.

// The enrolledCourses array is passed as a prop to the UserDashboard component, which will display the list of enrolled courses.

// Please replace the selectedCourse with the actual selected course from the CourseCatalog as per your application's logic.

// In this version of App.js, we've added the Login, CourseCatalog, CourseDetail, and UserDashboard components to the render method. We've also added a piece of state enrolledCourses to keep track of the courses that the user is enrolled in.

// The handleEnroll function is passed as a prop to the CourseDetail component. When called, it adds the selected course to the enrolledCourses array.

// The enrolledCourses array is passed as a prop to the UserDashboard component, which will display the list of enrolled courses.

// Please replace the selectedCourse with the actual selected course from the CourseCatalog as per your application's logic