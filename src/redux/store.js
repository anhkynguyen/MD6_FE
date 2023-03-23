import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/providerSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice"



export const store = configureStore({
  reducer: {
    post: providerReducer,
    user: userReducer,
    order: orderReducer
  },
});

export default store;
