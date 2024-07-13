import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResumeUpload from './ResumeUpload';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('axios');

beforeAll(() => {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
});

describe('ResumeUpload Component', () => {
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

    // Wait for the "Selected file" text to appear in the document
    expect(await screen.findByText('Selected file: example.pdf')).toBeInTheDocument();

    // Wait for the mock response to be called with the expected data
    await waitFor(() => expect(mockSetCourseRecommendations).toHaveBeenCalledWith(mockResponse.data));
  });
});
