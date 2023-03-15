import { createSlice } from "@reduxjs/toolkit";
import {
  addProvider,
  editProvider,
  getProviders,
  removeProvider,
} from "../../service/providerService";

const initialState = {
  posts: [],
  post: {},
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    // builder.addCase(findByIdAlbum.fulfilled,(state,action)=>{
    //     state.albums = action.payload
    // });
    builder.addCase(addProvider.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(removeProvider.fulfilled, (state, action) => {
      state.posts.splice(action.payload);
    });
    builder.addCase(editProvider.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});
export default postSlice.reducer;
