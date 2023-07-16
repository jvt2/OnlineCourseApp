import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders website underconstruction text', () => {
  render(<App />);
  const linkElement = screen.getByText(/website underconstruction/i);
  expect(linkElement).toBeInTheDocument();
});

