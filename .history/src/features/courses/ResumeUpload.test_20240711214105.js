import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import ResumeUpload from './ResumeUpload';

jest.mock('axios');

// Mock FileReader
function mockFileReader() {
  window.FileReader = jest.fn().mockImplementation(() => {
    return {
      readAsDataURL: function() {
        this.onload({
          target: {
            result: 'data:application/pdf;base64,dummybase64content',
          },
        });
      },
      onload: jest.fn(),
      onerror: jest.fn(),
    };
  });
}

describe('ResumeUpload Component', () => {
  beforeEach(() => {
    mockFileReader(); // Ensure FileReader is mocked before each test
  });

  test('renders dropzone and handles file upload', async () => {
    const mockSetCourseRecommendations = jest.fn(); // Define the mockSetCourseRecommendations function

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

    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-input');

    fireEvent.change(input, { target: { files: [file] } });

    // Add your waitFor or other assertions here to complete the test
  });

  // Add more tests as needed
});