// Register.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../path/to/your/store'; // replace with actual path to your Redux store
import Register from './Register';

test('renders Register form', () => {
  render(
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>
  );

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/Password:/i);
  const submitButton = screen.getByRole('button', { name: /Register/i });

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('allows the user to fill out the form', () => {
  render(
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>
  );

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/Password:/i);
  const submitButton = screen.getByRole('button', { name: /Register/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(submitButton);

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpass');
});
