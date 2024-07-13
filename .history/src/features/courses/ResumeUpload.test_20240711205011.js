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

    // Simulate file upload with valid PDF content
    const fileContent = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, 0x0A]); // Minimal PDF content
    const file = new File([fileContent], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-input'); // Make sure the input has a data-testid="file-input"

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText('Selected file: example.pdf')).toBeInTheDocument();

    // Wait for mock response
    await waitFor(() => {
      expect(mockSetCourseRecommendations).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});