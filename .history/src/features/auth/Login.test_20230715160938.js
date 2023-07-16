import { render, screen } from '@testing-library/react';
import Login from './Login';

console.log(process.env.NODE_ENV)

test('renders login form', () => {
  render(<Login />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
