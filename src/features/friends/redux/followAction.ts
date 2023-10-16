import { createAsyncThunk } from "@reduxjs/toolkit"
import followApi from "../api/followApi"

export const ffList = createAsyncThunk<
  boolean,
  {
    token: string
    // userUid: string;
    uid: any
  }
>("follow/ffList", async (data, { rejectWithValue }) => {
  try {
    const response = await (await followApi.ffList(data.token, data.uid)).data

    return response
  } catch (rejectWithValue) {
    return console.log(rejectWithValue)
  }
})
