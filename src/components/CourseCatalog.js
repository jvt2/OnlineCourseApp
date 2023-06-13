import React from 'react';
import { Link } from 'react-router-dom';

function CourseCatalog({ courses, onCourseClick }) {
  return (
    <div>
      <h2>Course Catalog</h2>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <Link onClick={() => onCourseClick(course)}>View Course</Link>
        </div>
      ))}
    </div>
  );

}

export default CourseCatalog;

// In this code, each course div has an onClick prop that calls the onCourseClick function with the current course as an argument. This will set 
// the selectedCourse state in the App component to the clicked course, which will then be passed to the CourseDetail component to display its details.