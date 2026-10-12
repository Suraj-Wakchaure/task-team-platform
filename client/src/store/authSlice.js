import { createSlice } from '@reduxjs/toolkit';

// Retrieve saved user and token from storage if already logged in
const savedUser = JSON.parse(
  localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'
);
const savedToken =
  localStorage.getItem('token') || sessionStorage.getItem('token') || null;

const initialState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, rememberMe } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      const storage = rememberMe ? localStorage : sessionStorage;
      
      storage.setItem('user', JSON.stringify(user));
      storage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
