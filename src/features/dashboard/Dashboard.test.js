import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Dashboard from './Dashboard';
import store from '../../redux/store';
import { setEnrolledCourses } from '../../redux/actions';
import '@testing-library/jest-dom';

test('renders enrolled courses', () => {
  store.dispatch(setEnrolledCourses([
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' }
  ]));

  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  expect(screen.getByText(/course 1/i)).toBeInTheDocument();
  expect(screen.getByText(/course 2/i)).toBeInTheDocument();
});
