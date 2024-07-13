import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Import waitFor function
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login'; // Import Login component for testing
import store from '../../redux/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
const mock = new MockAdapter(axios);

// Place the mock setup before the test to ensure it intercepts the request correctly
mock.onPost('http://localhost:3001/register').reply(200, { message: 'User Registered' });

test('register user and show login', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });

  fireEvent.click(screen.getByText(/register/i));

  // Use waitFor to handle asynchronous operations
  await waitFor(() => {
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});