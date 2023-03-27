import { createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  changeStatusOrder,
  getOrderInSeller,
  getOrderInUser,
  getOrderAdmin,
} from "../../service/orderService";

const initialState = {
  orders: [],
  order: [],
  orderInUser: [],
  orderInSeller: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderInUser.fulfilled, (state, action) => {
      console.log(action.payload, 33);
      state.orderInUser = action.payload;
    });
    builder.addCase(getOrderInSeller.fulfilled, (state, action) => {
      console.log(action.payload, 44);
      state.orderInSeller = action.payload;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      console.log(action.payload, 4444);
      state.orders.push(action.payload);
    });
    builder.addCase(changeStatusOrder.fulfilled, (state, action) => {
      console.log(action.payload, 33333);
      state.orderInSeller = action.payload;
    });
    builder.addCase(getOrderAdmin.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export default orderSlice.reducer;
