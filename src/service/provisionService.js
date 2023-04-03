import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProvision = createAsyncThunk(
  "provision/getProvisions",
  async () => {
    const res = await customAxios.get("provision");
    return res.data;
  }
);
