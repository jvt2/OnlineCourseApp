import React from 'react';

function UserDashboard({ courses }) {
  return (
    <div>
      <h2>Your Courses</h2>
      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </div>
        ))
      ) : (
        <p>You are not enrolled in any courses.</p>
      )}
    </div>
  );
}

export default UserDashboard;
