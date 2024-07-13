// src/features/courses/ResumeUpload.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResumeUpload from './ResumeUpload';

const mockSetCourseRecommendations = jest.fn();

describe('ResumeUpload Component', () => {
  test('renders dropzone and handles file upload', () => {
    render(<ResumeUpload setCourseRecommendations={mockSetCourseRecommendations} />);
    
    const dropzone = screen.getByText('Drag \'n\' drop your resume here, or click to select a file');
    expect(dropzone).toBeInTheDocument();

    // Simulate file upload
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [file] },
    });

    expect(screen.getByText('Selected file: example.pdf')).toBeInTheDocument();
  });
});