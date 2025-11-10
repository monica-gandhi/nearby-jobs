import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    userProfileData: null,
    roleId: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.roleId = action.payload.user?.roleId;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.roleId = null;
      state.userProfileData = null;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUserProfileData } = authSlice.actions;

export default authSlice.reducer;
