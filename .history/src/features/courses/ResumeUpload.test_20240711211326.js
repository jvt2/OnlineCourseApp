import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from './ResumeUpload';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('ResumeUpload Component', () => {
  test('renders dropzone and handles file upload', async () => {
    const mockResponse = {
      data: [
        { id: 0, text: { title: 'Advanced Machine Learning Course', description: 'Description of ML Course' } },
        { id: 1, text: { title: 'Cloud Native Architectures Course', description: 'Description of Cloud Course' } },
      ],
    };
    axios.post.mockResolvedValue(mockResponse);
  
    const mockSetCourseRecommendations = jest.fn(); // Define the mockSetCourseRecommendations function
  
    render(
      <MemoryRouter>
        <ResumeUpload setCourseRecommendations={mockSetCourseRecommendations} /> {/* Pass the mockSetCourseRecommendations function */}
      </MemoryRouter>
    );
  
    const dropzone = screen.getByText("Drag 'n' drop your resume here, or click to select a file");
    expect(dropzone).toBeInTheDocument();
  
    // Simulate file upload without actual PDF content
    const file = new File(['dummy content'], 'example.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-input'); // Make sure the input has a data-testid="file-input"
  
    // Fire the event without act() since fireEvent is already wrapped in act internally
    fireEvent.change(input, { target: { files: [file] } });
  
    expect(screen.getByText('Selected file: example.pdf')).toBeInTheDocument();
  
    // Wait for mock response
    await waitFor(() => {
      expect(mockSetCourseRecommendations).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});