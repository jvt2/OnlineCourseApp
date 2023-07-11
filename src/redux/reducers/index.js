// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from './userslice';
// Import your reducers here

const rootReducer = combineReducers({
  // The key 'user' respresents a slice of the state, and the userReducer is the set of rules 
  // for how that data can change
  user: userReducer
});

export default rootReducer;
