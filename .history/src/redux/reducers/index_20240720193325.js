// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from '../../userslice'; // Updated import path

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
