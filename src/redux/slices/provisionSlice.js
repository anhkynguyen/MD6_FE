import { createSlice } from "@reduxjs/toolkit";
import { getProvision } from "../../service/provisionService";

const initialState = {
  provisions: [],
  provision: [],
};
const provisionSlice = createSlice({
  name: "provision",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvision.fulfilled, (state, action) => {
      console.log(action.payload, 333);
      state.provisions = action.payload;
    });
  },
});
export default provisionSlice.reducer;
