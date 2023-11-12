import qs from "query-string"
import appApi from "@/redux/appApi"
// import { ArtistResList } from "@/pages/api/artists";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["chatRoom", "userInfo"],
})

const chattingApi = appTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, any>({
      query: (args) => ({
        url: `api/users/${args.uid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
      providesTags: () => [{ type: "userInfo" }],
    }),
    getChatRoom: builder.query<any, any>({
      query: (args) => ({
        url: `api/chatting/roomList/${args.uid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
      providesTags: () => [{ type: "chatRoom" }],
    }),

    postMsg: builder.mutation<any, any>({
      query: (args) => ({
        url: `api/chatting`,
        method: "POST",
        body: args.formData,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${args.token}`,
        },
      }),
      invalidatesTags: () => [{ type: "chatRoom" }],
    }),
  }),
  overrideExisting: true,
})

export default chattingApi
export const { useLazyGetChatRoomQuery, useLazyGetUserInfoQuery, usePostMsgMutation } = chattingApi
