import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const rentProvider = createAsyncThunk(
  "provision/rentProvision",
  async (data) => {
    console.log(data, 1234);
    const res = await customAxios.post("order/add", data);
    console.log(res.data, 12345);
    return res.data;
  }
);
