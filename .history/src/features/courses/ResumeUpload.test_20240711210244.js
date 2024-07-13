import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import ResumeUpload from './ResumeUpload';

jest.mock('axios');

// Add structuredClone polyfill
if (typeof structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

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

    render(
      <MemoryRouter>
        <ResumeUpload setCourseRecommendations={mockSetCourseRecommendations} />
      </MemoryRouter>
    );

    const dropzone = screen.getByText("Drag 'n' drop your resume here, or click to select a file");
    expect(dropzone).toBeInTheDocument();

    // Simulate file upload without actual PDF content
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-input'); // Make sure the input has a data-testid="file-input"

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText('Selected file: example.pdf')).toBeInTheDocument();

    // Wait for mock response
    await waitFor(() => {
      expect(mockSetCourseRecommendations).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});
