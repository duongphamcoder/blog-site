import { createSlice } from "@reduxjs/toolkit";

const loginReducer = createSlice({
  name: "login",
  initialState: {
    login: {
      fetching: null,
      currentUser: null,
      isFetching: false,
      error: false,
      isLogin: false,
    },
  },

  reducers: {
    loginStart: (state) => {
      state.login.fetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isLogin = true;
    },
    loginToken: (state, action) => {
      state.login.isToken = action.payload;
    },
    loginFailed: (state) => {
      state.login.error = true;
    },
  },
});

export const { loginFailed, loginStart, loginSuccess, loginToken } = loginReducer.actions;

export default loginReducer.reducer;