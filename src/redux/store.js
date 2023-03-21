import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/providerSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import provisionReducer from "./slices/provisionSlice";

export const store = configureStore({
  reducer: {
    post: providerReducer,
    user: userReducer,
    order: orderReducer,
    provision: provisionReducer,
  },
});

export default store;
