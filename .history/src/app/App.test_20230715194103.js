import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders website underconstruction text', () => {
  render(<App />);
  const linkElement = screen.getByText(/website underconstruction/i);
  expect(linkElement).toBeInTheDocument();
});
