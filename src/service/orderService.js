import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
export const rentProvider = createAsyncThunk(
  "user/getRentProvider",
  async (data) => {
    await customAxios.post("order/add");
    const res = await customAxios.post("order");
    console.log(res.data, 2222);
    return res.data;
  }
);
