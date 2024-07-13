import React from 'react';
import CourseRecommendations from '../../components/CourseRecommendations';

function RecommendationsPage({ recommendations, onSelect }) {
  return (
    <div>
      <h2>Course Recommendations</h2>
      <CourseRecommendations recommendations={recommendations} onSelect={onSelect} />
    </div>
  );
}

export default RecommendationsPage;
