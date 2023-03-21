import { createSlice } from "@reduxjs/toolkit";
import { rentProvider } from "../../service/orderService";

const initialState = {
  orders: [],
  order: [],
};

const orderSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rentProvider.fulfilled, (state, action) => {
      state.orderDetails.push(action.payload);
    });
  },
});
export default orderSlice.reducer;
