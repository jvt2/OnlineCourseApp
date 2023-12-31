import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../logo.svg';
import './App.css';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import CourseCatalog from '../features/courses/CourseCatalog';
import CourseDetail from '../features/courses/CourseDetail'; 
import UserDashboard from '../features/dashboard/Dashboard';
import ResumeUpload from './components/ResumeUpload';
import Navbar from '../components/common/Navbar';
import { Provider } from 'react-redux';
import store from '../redux/store'; // import your Redux store here
import Logout from '../features/auth/Logout'; // Import the Logout component
import Chatbot from '../features/chatbot/Chatbot';
import CourseRecommendations from '../features/courses/CourseRecommendations';




function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
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
  const handleSelectRecommendation = (recommendation) => {
    // Create a new course object with the details of the recommended course
    console.log('Passing recommendations to CourseRecommendations:', recommendations);

    const newCourse = {
      id: courses.length + 1, // Assign a new id
      name: recommendation.text, // Use the recommendation text as the course name
      description: 'This is a recommended course based on your resume.' // Add a description
    };
  
    // Add the new course to the courses array
    setCourses([...courses, newCourse]);

    // Add the new course to the enrolledCourses array
    setEnrolledCourses([...enrolledCourses, newCourse]);
    // Close the modal
    setIsModalOpen(false);
    
  };

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // replace this with the selected course from the course catalog 
   

  const handleEnroll = (course) => {
    // Check if the course is already in the enrolledCourses array
    if (!enrolledCourses.includes(course)) {
      // If not, add it to the array
      setEnrolledCourses([...enrolledCourses, course]);
    }
    
    // This will log the recommendations state just before it's passed to the CourseRecommendations component. If the recommendations array is still empty at this point, it means that the state is not being updated correctly in the uploadResume function. If the recommendations array contains the expected data, it means that the state is being updated correctly but not passed correctly to the CourseRecommendations component.
    console.log('Passing recommendations to CourseRecommendations:', recommendations);
    console.log('Recommendations state in App.js:', recommendations);
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRecommendations = (recs) => {
    setRecommendations(recs);
    setIsModalOpen(true);
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
              <Route path='/recommendations' element={<CourseRecommendations recommendations={recommendations} onSelect={handleEnroll} />} />
              
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
          {recommendations && recommendations.length > 0 && (
            <CourseRecommendations
              recommendations={recommendations}
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              onSelect={handleSelectRecommendation}
            />
          )}
        </div>
      </Router>
    </Provider>
  );
}

export default App;

