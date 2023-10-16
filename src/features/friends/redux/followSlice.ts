import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./followState"
import { ffList } from "./followAction"

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(ffList.pending, (state, action) => {
      state.ff = action.payload
      state.ffLoading = true
    })
    builder.addCase(ffList.fulfilled, (state, action) => {
      state.ff = action.payload
      state.ffLoading = false
    })
    builder.addCase(ffList.rejected, (state, action) => {
      state.ff = action.payload
      state.ffLoading = false
    })
  },
})

export default followSlice.reducer
