// src/features/dashboard/Dashboard.js

import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const enrolledCourses = useSelector(state => state.user.enrolledCourses);

  return (
    <div>
      <h2>Your Courses</h2>
      {enrolledCourses.length > 0 ? (
        <ul>
          {enrolledCourses.map(course => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any courses.</p>
      )}
    </div>
  );
}

export default Dashboard;

