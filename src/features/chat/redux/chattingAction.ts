import { createAsyncThunk } from "@reduxjs/toolkit"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import chattingApi from "../api"

/* 채팅방 조회 */
export const getChatRoomList = createAsyncThunk<
  any,
  {
    token: string
    // params: Params
    uid: string
  }
>("chatting/getChatRoomList", async (data) => {
  try {
    const response = await chattingApi.getChatRoom(data.token, data.uid)
    return response.data
  } catch (err) {
    return console.log(err)
  }
})
/* 메시지 조회 */
/* 채팅방 조회 */
export const getMsgList = createAsyncThunk<
  any,
  {
    token: string
    room_id: string
  }
>("chatting/getMsgList", async (data) => {
  try {
    const response = await chattingApi.getMsg(data.token, data.room_id)
    return response.data
  } catch (err) {
    return console.log(err)
  }
})
