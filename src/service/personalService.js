import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const addPersonal = createAsyncThunk(
  "personal/addPersonal",
  async (data) => {
    const res = await customAxios.post("personalService/add", data);
    console.log(res.data, 555);
    return res.data;
  }
);
