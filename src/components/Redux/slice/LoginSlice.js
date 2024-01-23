import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    signupClicked: false,
    isLogined: false,
    userName: "null",
  },
  reducers: {
    signupClickeHandler: (state, action) => {
      state.signupClicked = action.payload;
    },
    loginHandler: (state, action) => {
      state.isLogined = action.payload;
    },
    nameHandler: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { signupClickeHandler, nameHandler, loginHandler } =
  LoginSlice.actions;
export default LoginSlice.reducer;
