import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./loginState";

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload; // Add the product to the productInfo array
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
