// src/features/courses/ResumeUpload.test.js

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ResumeUpload from './ResumeUpload';

jest.mock('axios');

const mockSetCourseRecommendations = jest.fn();

describe('ResumeUpload Component', () => {
  test('renders dropzone and handles file upload', async () => {
    const mockResponse = {
      data: [
        { id: 0, text: { title: 'Advanced Machine Learning Course', description: 'Description of ML Course' } },
        { id: 1, text: { title: 'Cloud Native Architectures Course', description: 'Description of Cloud Course' } },
      ],
    };
    axios.post.mockResolvedValue(mockResponse);

    render(<ResumeUpload setCourseRecommendations={mockSetCourseRecommendations} />);

    const dropzone = screen.getByText("Drag 'n' drop your resume here, or click to select a file");
    expect(dropzone).toBeInTheDocument();

    // Simulate file upload
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [file] },
    });

    expect(screen.getByText('Selected file: example.pdf')).toBeInTheDocument();

    // Wait for mock response
    await waitFor(() => {
      expect(mockSetCourseRecommendations).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});
