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
    try {
      const res = await customAxios.get("/order/getAllOrdersInSeller/" + data); // data là idPost
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const addOrder = createAsyncThunk("order/addOrder", async (data) => {
  console.log(data, 24);
  const res = await customAxios.post("order/add", data);
  console.log(res.data, 25);
  return res.data;
});
export const changeStatusOrder = createAsyncThunk(
  "order/changeStatusOrder",
  async (data) => {
    console.log(data, 32);
    await customAxios.get("order/changeStatusOrder/" + data);
    console.log(data, 34);
    return data;
  }
);
