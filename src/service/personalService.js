import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const addPersonal = createAsyncThunk(
  "personal/addPersonal",
  async (data) => {
    const res = await customAxios.post("personal/add", data);

    return res.data;
  }
);
