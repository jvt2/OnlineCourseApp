import React from 'react';
import './Dashboard.css';

function UserDashboard({ courses }) {
  return (
    <div className='dashboard-container'>
      <h2 className='dashboard-header'>Your Courses</h2>
      <div className='course-list'>
        {courses.length > 0 ? (
          courses.map(course => (
            <div className='course-item' key={course.id}>
              <h3 className="course-title">{course.name}</h3>
              <p>{course.description}</p>
            </div> 
          ))
        ) : (
          <p>You are not enrolled in any courses.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
