import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';


function CourseCatalog() {
  const [courses, setCourses] = useState([]); // <-- Add this line
  const [courseRecommendations, setCourseRecommendations] = useState([]);

  const handleSelectRecommendation = (recommendation) => {
    // Create a new course object with the details of the recommended course
    const newCourse = {
      id: courses.length + 1, // Assign a new id
      name: recommendation.text, // Use the recommendation text as the course name
      description: 'This is a recommended course based on your resume.' // Add a description
    };
  
    // Add the new course to the courses array
    setCourses([...courses, newCourse]);
  };

  return (
    <div>
      <h1>Course Catalog</h1>
      <ResumeUpload setCourseRecommendations={setCourseRecommendations} />
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseCatalog;



// In this code, each course div has an onClick prop that calls the onCourseClick function with the current course as an argument. This will set 
// the selectedCourse state in the App component to the clicked course, which will then be passed to the CourseDetail component to display its details.
