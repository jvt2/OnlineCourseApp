import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

configure({ adapter: new Adapter() });

// Mocks out the 'react-modal' library
jest.mock('react-modal', () => {
  const Modal = ({ children }) => children;
  Modal.setAppElement = () => {};
  return Modal;
});

// Mocks out the 'react-router-dom' library
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

// Mocks out the 'history' library
jest.mock('history', () => ({
  createMemoryHistory: jest.fn(() => ({
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
  })),
}));
