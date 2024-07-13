import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders website under construction text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Website under construction/i);
  expect(linkElement).toBeInTheDocument();
});