import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth && JSON.parse(isAuth) === true;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  userType: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true;
      state.userType = action.payload;
    },
    unAuthenicateUser: (state) => {
      state.isAuth = false;
      state.userType = null;
    },
  },
});

export const { authenticateUser, unAuthenicateUser } = authSlice.actions;
export default authSlice.reducer;
