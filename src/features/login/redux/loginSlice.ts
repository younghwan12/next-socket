// import { createSlice } from "@reduxjs/toolkit";
// import { initialState } from "./loginState";

// const loginSlice = createSlice({
//   name: "login",
//   initialState: initialState,
//   reducers: {
//     login: (state, action) => {
//       state.userInfo = action.payload; // Add the product to the productInfo array
//     },
//   },
// });

// export const { login } = loginSlice.actions;

// export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./loginState"
import { getLogin, fetchUser, getLogout, getSocialToken } from "./loginAction"

export const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.token = action.payload?.data.accessToken
    })

    builder.addCase(getLogin.rejected, (state, action) => {
      alert("로그인이 실패했습니다. 아이디와 비밀번호를 확인하세요.")
      console.log("state", action.payload)
      state.token = ""
      state.userInfo = initialState.userInfo
      // state.errorMsg1 = "로그인이 실패했습니다."
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.token = ""
      state.userInfo = initialState.userInfo
    })

    builder.addCase(getSocialToken.fulfilled, (state, action) => {
      state.token = action.payload
    })
  },
})

export default logInSlice.reducer
