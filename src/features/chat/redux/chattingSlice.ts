import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./chattingState"
import { getChatRoomList, getMsgList } from "./chattingAction"

export const chattingSlice = createSlice({
  name: "chatt",
  initialState,
  reducers: {
    addSubscribedMessage: (
      state,
      action: PayloadAction<{ roomId: number; notRead: number; sendUserId: number; message: string; crtrDt: string }>
    ) => {
      const { roomId, sendUserId, message, crtrDt, notRead } = action.payload
      const newMessage = {
        message,
        not_read: notRead,
        room_id: roomId,
        send_user_id: sendUserId,
        crtrDt: crtrDt,
      }
      if (state.msgList) {
        state.msgList = [...state.msgList, newMessage]
      }
    },
    updateNReadChat: (
      state,
      action: PayloadAction<{ roomId: number; message: string; not_read_chat?: number; readYN?: number }>
    ) => {
      const { roomId, message, not_read_chat, readYN } = action.payload
      state.chatRoomList = state.chatRoomList.map((room) => {
        if (room.roomId === roomId) {
          return {
            ...room,
            not_read_chat: readYN == 1 ? 0 : room.not_read_chat + not_read_chat,
            last_chat: message,
          }
        }
        return room
      })
    },
    markAllMessagesAsRead: (state) => {
      // Use map to create a new array with updated not_read values
      if (state.msgList) {
        state.msgList = state.msgList.map((message) => ({ ...message, not_read: 0 }))
      }
    },
  },
  extraReducers: (builder) => {
    // 채팅방 목록 조회
    builder.addCase(getChatRoomList.pending, (state, action) => {
      state.fetchChatRoomListLoading = true
    })
    builder.addCase(getChatRoomList.fulfilled, (state, action) => {
      state.chatRoomList = action.payload
      state.fetchChatRoomListLoading = false
    })
    builder.addCase(getChatRoomList.rejected, (state, action) => {
      state.fetchChatRoomListErrors = action.error
      state.fetchChatRoomListLoading = false
    })

    builder.addCase(getMsgList.pending, (state, action) => {
      state.fetchMsgListLoading = true
    })
    builder.addCase(getMsgList.fulfilled, (state, action) => {
      state.msgList = action.payload
      state.fetchMsgListLoading = false
    })
    builder.addCase(getMsgList.rejected, (state, action) => {
      state.fetchMsgListErrors = action.error
      state.fetchMsgListLoading = false
    })
  },
})

export const { addSubscribedMessage, updateNReadChat, markAllMessagesAsRead } = chattingSlice.actions

export default chattingSlice.reducer
