import { createAsyncThunk } from "@reduxjs/toolkit"
import loginApi from "../api/loginApi"

export const getLogin = createAsyncThunk<
  any,
  {
    email: string
    password: string
  }
>("Login/getLogin", async (data, { rejectWithValue }) => {
  try {
    const response = await loginApi.login(data)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const fetchUser = createAsyncThunk("Login/fetchUser", async (token: string, { rejectWithValue }) => {
  try {
    const response = await (await loginApi.fetchUser(token)).data

    return response
  } catch (rejectWithValue) {
    return console.log(rejectWithValue)
  }
})

export const getLogout = createAsyncThunk("Login/getLogout", async (data, { rejectWithValue }) => {
  try {
    const response = data
    return response
  } catch (err) {
    return console.log(err)
  }
})

export const getSocialToken = createAsyncThunk("Login/getSocialToken", async (token: string, { rejectWithValue }) => {
  try {
    return token
  } catch (err) {
    return console.log(err)
  }
})
