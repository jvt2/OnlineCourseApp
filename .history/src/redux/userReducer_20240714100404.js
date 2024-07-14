// src/redux/userReducer.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', token: '', loggedIn: false },
  reducers: {
    logIn: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.email = '';
      state.token = '';
      state.loggedIn = false;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
