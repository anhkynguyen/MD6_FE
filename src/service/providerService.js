import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProviders = createAsyncThunk("post/getPosts", async () => {
  const res = await customAxios.get("post");
  return res.data;
});
export const findByIdProvider = createAsyncThunk(
  "post/findByIdPost",
  async (data) => {
    const res = await customAxios.get("post/" + data);
    return res.data;
  }
);

export const addProvider = createAsyncThunk("post/addPost", async (data) => {
  const res = await customAxios.post("post", data);
  return res.data;
});
export const removeProvider = createAsyncThunk(
  "post/removePost",
  async (data) => {
    const res = await customAxios.delete("post/" + data);
    return data;
  }
);

export const editProvider = createAsyncThunk("post/editPost", async (data) => {
  await customAxios.put("post/" + data[1], data[0]);
  const res = await customAxios.get("post");
  return res.data;
});
