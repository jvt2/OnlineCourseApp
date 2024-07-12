import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../../redux/reducers';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Set up mock for axios
const mock = new MockAdapter(axios);

test('renders enrolled courses', async () => {
  const testStore = configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: {
        id: 1,
        enrolledCourses: [{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }]
      }
    }
  });

  // Mock the API response
  mock.onGet('http://localhost:3001/user/1/courses').reply(200, [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
  ]);

  render(
    <Provider store={testStore}>
      <Router>
        <Dashboard />
      </Router>
    </Provider>
  );

  expect(screen.getByText('Your Courses')).toBeInTheDocument();

  // Wait for the courses to be displayed
  await waitFor(() => {
    expect(screen.getByText('Course 1')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText('Course 2')).toBeInTheDocument();
  });
});
