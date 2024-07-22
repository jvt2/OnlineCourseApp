import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Correct import path

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;