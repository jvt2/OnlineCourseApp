import React, { useState, useEffect } from 'react';
import ResumeUpload from './ResumeUpload';
import CourseRecommendations from './CourseRecommendations';
import MyModal from './MyModal';

function CourseCatalog() {
  const [courses, setCourses] = useState([]); 
  const [courseRecommendations, setCourseRecommendations] = useState([]);
  const [showRecommendationsPopup, setShowRecommendationsPopup] = useState(false);

  useEffect(() => {
    console.log('CourseRecommendations state in CourseCatalog:', courseRecommendations);
  }, [courseRecommendations]);

  const handleResumeUpload = (recommendations) => {
    setCourseRecommendations(recommendations);
    setShowRecommendationsPopup(true);
  };

  const closeRecommendationsPopup = () => {
    setShowRecommendationsPopup(false);
  };

  return (
    <div>
      <h1>Course Catalog</h1>
      <ResumeUpload setCourseRecommendations={handleResumeUpload} />
      <MyModal isOpen={showRecommendationsPopup} onClose={closeRecommendationsPopup}>
        <CourseRecommendations 
        recommendations={courseRecommendations}
        onClose={closeRecommendationsPopup}
        />
      </MyModal>
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
