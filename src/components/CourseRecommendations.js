//CourseRecommendations.js 

import React from 'react';

function CourseRecommendations({ recommendations, onSelect }) {
  return (
    <div>
      <h2>Course Recommendations</h2>
      {Array.isArray(recommendations) && (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              {recommendation.text}
              <button onClick={() => onSelect(recommendation)}>Add to my courses</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseRecommendations;
