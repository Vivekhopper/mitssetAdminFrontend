import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./src/components/redux/authSlice";
export const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
  },
});
