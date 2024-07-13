import { configureStore } from '@reduxjs/toolkit'; // Ensure correct import for configureStore
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Missing import for Provider
import rootReducer from '../../redux/reducers';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'; // Corrected import for render and added screen

test('renders enrolled courses', async () => {
  const testStore = configureStore({
    reducer: rootReducer,
    preloadedState: { // Corrected typo from preloadState to preloadedState
      user: {
        id: 1,
        enrolledCourses: [{ id: 1, name: 'Course 1' }, { id: 2, name: 'Course 2' }]
      }
    }
  });

  render(
    <Provider store={testStore}>
      <Router>
        <Dashboard />
      </Router>
    </Provider>
  );

  expect(screen.getByText('Your Courses')).toBeInTheDocument();
  expect(screen.getByText('Course 1')).toBeInTheDocument();
  expect(screen.getByText('Course 2')).toBeInTheDocument();
});