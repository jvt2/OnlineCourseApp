import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'; // make sure this path correctly points to your Login component

test('renders without crashing', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
});
