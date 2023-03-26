import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./slices/providerSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import provisionReducer from "./slices/provisionSlice";
import personalReducer from "./slices/provisionSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    post: providerReducer,
    user: userReducer,
    order: orderReducer,
    provision: provisionReducer,
    personal: personalReducer,
    comment: commentReducer,
  },
});

export default store;
