import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Recommendation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
`;

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #0056b3;
  }
`;

function CourseRecommendations({ recommendations, onSelect }) {
  const [localRecommendations, setLocalRecommendations] = useState([]);

  useEffect(() => {
    console.log('Recommendations prop changed:', recommendations);
    setLocalRecommendations(recommendations);
  }, [recommendations]);

  return (
    <Container>
      <Heading>Course Recommendations</Heading>
      {localRecommendations.map((recommendation, index) => (
        <Recommendation key={index}>
          <Text>{recommendation.text}</Text>
          <Button onClick={() => onSelect(recommendation)}>Add to my courses</Button>
        </Recommendation>
      ))}
    </Container>
  );
}

export default CourseRecommendations;
