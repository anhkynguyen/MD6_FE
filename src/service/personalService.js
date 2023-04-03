import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const addPersonal = createAsyncThunk(
  "personal/addPersonal",
  async (data) => {
    const res = await customAxios.post("personalService/add", data);

    return res.data;
  }
);
export const getPersonalByIdUser = createAsyncThunk(
  "personal/getPersonalByIdUser",
  async (data) => {
    const res = await customAxios.get("users/showPersonal/" + data);

    return res.data;
  }
);
