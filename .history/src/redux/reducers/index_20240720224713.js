import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice'; // Correct import path

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;