import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./loginState"
import { destroyCookie, setCookie } from "nookies"
import { getLogin, getUserInfo } from "./loginAction"

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      // 로그아웃 로직
      destroyCookie(null, "jwt")
      return {
        ...state,
        userInfo: null,
        userInfoDetail: null,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state, action) => {
      state.fetchLoginInfoLoading = true
    })
    builder.addCase(getLogin.fulfilled, (state, action) => {
      const accessToken = action.payload?.accessToken
      if (accessToken) {
        setCookie(null, "accessToken", accessToken, {
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        })
      }
      state.loginInfo = action.payload
      state.fetchLoginInfoLoading = false
    })
    builder.addCase(getLogin.rejected, (state, action) => {
      alert("로그인이 실패했습니다. 아이디와 비밀번호를 확인하세요.")
      state.fetchLoginInfoLoading = false
      state.fetchLoginInfoErrors = action.error.message as string
    })

    // 상세정보
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.fetchUserInfoDetailLoading = true
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfoDetail = action.payload
      state.fetchUserInfoDetailLoading = false
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.fetchUserInfoDetailLoading = false
    })
  },
})

// export const { login, logout } = loginSlice.actions
export const { logout } = loginSlice.actions
export default loginSlice.reducer
