import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './authApi';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUnauthorized: (state) => {
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
      state.isAuthenticated = true;
    });
    // .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
    //   state.isAuthenticated = false;
    // });
  },
});

export const { setUnauthorized } = authSlice.actions;
export default authSlice;
