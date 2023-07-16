import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store'; // replace with actual path to your Redux store
import Login from './Login'; // make sure this path correctly points to your Login component

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
});
