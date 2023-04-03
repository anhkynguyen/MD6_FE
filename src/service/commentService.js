import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (data) => {
    const res = await customAxios.post("comment/add", data);
    return res.data;
  }
);
export const getAllComment = createAsyncThunk(
  "comment/getAllComment",
  async (data) => {
    const res = await customAxios.get("comment"); // data là idUser

    return res.data;
  }
);
