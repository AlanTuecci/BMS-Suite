import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth && JSON.parse(isAuth) === true;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  userType: null,
  inventoryAccessLevel: 0,
  laborAccessLevel: 0,
  cashAccessLevel: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true;
      state.userType = action.payload.userType;
      state.inventoryAccessLevel = action.payload.inventoryAccessLevel || 0;
      state.laborAccessLevel = action.payload.laborAccessLevel || 0;
      state.cashAccessLevel = action.payload.cashAccessLevel || 0;
    },
    unAuthenicateUser: (state) => {
      state.isAuth = false;
      state.userType = null;
      state.inventoryAccessLevel = 0;
      state.laborAccessLevel = 0;
      state.cashAccessLevel = 0;
    },
  },
});

export const { authenticateUser, unAuthenicateUser } = authSlice.actions;
export default authSlice.reducer;