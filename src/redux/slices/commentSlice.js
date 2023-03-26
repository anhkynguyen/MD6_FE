import { createSlice } from "@reduxjs/toolkit";
import { addComment, getAllComment } from "../../service/commentService";

const initialState = {
  comments: [],
  comment: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});
export default commentSlice.reducer;
