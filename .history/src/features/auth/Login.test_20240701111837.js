import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from '../dashboard/Dashboard'; // Import Dashboard component for testing
import store from '../../redux/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

const mock = new MockAdapter(axios);

test('renders login form and logs in successfully', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });
  
  mock.onPost('http://localhost:3001/login').reply(200, { token: 'test-token' });
  
  fireEvent.click(screen.getByText(/login/i));

  expect(await screen.findByText(/your courses/i)).toBeInTheDocument();
});
