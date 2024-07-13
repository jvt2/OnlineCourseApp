//CourseDetails.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail({ courses, onEnroll }) {
  const { id } = useParams();
  const course = courses.find(course => course.id === Number(id));
  
  const [enrolled, setEnrolled] = useState(false);

  if (!course) {
    return <p>Course not found</p>;
  }

  const handleEnroll = async () => {
    try {
      await axios.post('http://localhost:3001/enrollments', { courseId: course.id });
      setEnrolled(true);
      alert(`Enrolled in ${course.name}`);
      onEnroll(course);
    } catch (error) {
      console.log('Error enrolling in course: ', error);
    }
  };

  return (
    <div>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      {!enrolled && <button onClick={handleEnroll}>Enroll</button>}
      {enrolled && <p>You are enrolled in this course.</p>}
    </div>
  );
}

export default CourseDetail;
//This component takes a course prop, which is an object with the course's name and description. It also uses a piece of state enrolled to keep track of whether the user has enrolled in the course. When the "Enroll" button is clicked, it sets enrolled to true and shows an alert.

//You can create a new file called CourseDetail.js in your components directory and paste this code there.

//For now, you can use this component in your App.js file with a static course object to see it in action. Later, we'll modify the CourseCatalog component to set the selected course when a course is clicked.