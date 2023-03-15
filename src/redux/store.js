import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/providerSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    post: providerReducer,
    user: userReducer,
  },
});

export default store;
