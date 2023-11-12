import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserInfo } from "../types"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import loginApi from "../api"

// 로그인
export const getLogin = createAsyncThunk<
  UserInfo,
  {
    params: Params
  }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await loginApi.login(data.params)
    return response.data
  } catch (err: any) {
    const serializedError = {
      message: err.response.data.message,
      status: err.response.data.status,
      // 필요한 다른 정보도 추가할 수 있음
    }
    return rejectWithValue(serializedError)
  }
})

// 사용자정보
export const getUserInfo = createAsyncThunk("auth/userInfo", async (token: string, { rejectWithValue }) => {
  try {
    const response = await loginApi.getUserInfo(token)
    return response.data
  } catch (rejectWithValue) {
    return console.log(rejectWithValue)
  }
})
