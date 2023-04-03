import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getOrderInUser = createAsyncThunk(
  "order/getAllOrdersInUser",
  async (data) => {
    try {
      const res = await customAxios.get("/order/getAllOrdersInUser/" + data); // data là idUser
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getOrderInSeller = createAsyncThunk(
  "order/getAllOrdersInSeller",
  async (data) => {
    const res = await customAxios.get("/order/getAllOrdersInSeller/" + data); // data là idPost
    return res.data;
  }
);
export const addOrder = createAsyncThunk("order/addOrder", async (data) => {

  const res = await customAxios.post("order/add", data);

  return res.data;
});
export const changeStatusOrder = createAsyncThunk(
  "order/changeStatusOrder",
  async (data) => {
    await customAxios.get("order/changeStatusOrder/" + data);
    return data;
  }
);
export const getOrderAdmin = createAsyncThunk(
  "order/getAllOrders",
  async () => {
    const res = await customAxios.get("order/getAllOrders");
    return res.data;
  }
);
