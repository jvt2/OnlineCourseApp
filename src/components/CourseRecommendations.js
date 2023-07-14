// CourseRecommendations.js

import React, { useEffect, useState } from 'react';

function CourseRecommendations({ recommendations, onSelect }) {
  const [localRecommendations, setLocalRecommendations] = useState([]);

  useEffect(() => {
    console.log('Recommendations prop changed:', recommendations);
    setLocalRecommendations(recommendations);
  }, [recommendations]);

  return (
    <div>
      <h2>Course Recommendations</h2>
      {localRecommendations.map((recommendation, index) => {
        console.log('Rendering recommendation:', recommendation); // Log each recommendation being rendered
        return (
          <li key={index}>
            {recommendation.text}
            <button onClick={() => onSelect(recommendation)}>Add to my courses</button>
          </li>
        );
      })}
    </div>
  );
}

export default CourseRecommendations;
