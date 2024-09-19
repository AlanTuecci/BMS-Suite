import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth && JSON.parse(isAuth) === true;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
    },
    unAuthenicateUser: (state) => {
      state.isAuth = false;
    },
  },
});

export const { authenticateUser, unAuthenicateUser } = authSlice.actions;
export default authSlice.reducer;
