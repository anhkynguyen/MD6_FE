import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const addPersonal = createAsyncThunk(
  "personal/addPersonal",
  async (data) => {
    console.log(Number(data), 123);
    const res = await customAxios.post("personalService/add", data);
    console.log(res.data, 555);
    return res.data;
  }
);
