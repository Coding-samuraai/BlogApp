import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
  },
});
