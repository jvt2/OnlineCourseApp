// src/features/courses/CourseRecommendations.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CourseRecommendations from './CourseRecommendations';

const recommendations = [
  { id: 0, text: { title: 'Advanced Machine Learning Course', description: 'This course will deepen the individual\'s understanding of machine learning algorithms, techniques, and applications.' } },
  { id: 1, text: { title: 'Cloud Native Architectures Course', description: 'Given the individual\'s experience in designing and deploying various cloud native architectures for data and machine learning platforms, this course will provide them with a more comprehensive understanding of cloud computing concepts, services, and best practices.' } },
  { id: 2, text: { title: 'DevOps Tools and Practices Course', description: 'As the individual has experience in writing, testing, reviewing, and managing production software systems using DevOps tools, taking a course in DevOps tools and practices will further enhance their expertise in continuous integration, continuous delivery, and automation.' } }
];

describe('CourseRecommendations Component', () => {
  test('renders recommendations', () => {
    render(<CourseRecommendations recommendations={recommendations} />);
    
    // Check if the titles are rendered
    expect(screen.getByText('Advanced Machine Learning Course')).toBeInTheDocument();
    expect(screen.getByText('Cloud Native Architectures Course')).toBeInTheDocument();
    expect(screen.getByText('DevOps Tools and Practices Course')).toBeInTheDocument();

    // Check if the descriptions are rendered
    expect(screen.getByText(/This course will deepen the individual's understanding of machine learning/)).toBeInTheDocument();
    expect(screen.getByText(/Given the individual's experience in designing and deploying various cloud native architectures/)).toBeInTheDocument();
    expect(screen.getByText(/As the individual has experience in writing, testing, reviewing, and managing production software systems/)).toBeInTheDocument();
  });

  test('renders no recommendations available when empty', () => {
    render(<CourseRecommendations recommendations={[]} />);

    expect(screen.getByText('No recommendations available.')).toBeInTheDocument();
  });
});
