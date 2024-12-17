import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  adminId: "",
  adminName: "",
  FinalData: null,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.adminName = action.payload;
      //   state.adminId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      // console.log(state.isAuthenticated)
    },
    changeFinalData: (state, action) => {
      state.FinalData = action.payload;
      // console.log(state.FinalData)
    },
  },
});

export const { login, logout, changeFinalData } = authSlice.actions;

export default authSlice.reducer;
