import qs from "query-string"
import appApi from "@/redux/appApi"
// import { ArtistResList } from "@/pages/api/artists";

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ["follower", "message"],
})

const followApi = appTaggedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowList: builder.query<any, any>({
      query: (args) => ({
        url: `api/follows/getfollowings/${args.uid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
      providesTags: () => [{ type: "follower" }],
    }),
    // getMsgList: builder.query<any, any>({
    //   query: (args) => ({
    //     url: `api/chat/${args.uid}/${args.to_user_uid}`,
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${args.token}`,
    //     },
    //   }),
    //   providesTags: () => [{ type: "message" }],
    // }),
    getMsgList: builder.query<any, any>({
      query: (args) => ({
        url: `api/chatting/room?room_id=${args.room_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
      providesTags: () => [{ type: "message" }],
    }),
    chatMsg: builder.mutation<any, any>({
      query: (args) => ({
        url: `api/chat`,
        method: "POST",
        body: args.formData,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${args.token}`,
        },
      }),
      invalidatesTags: () => [{ type: "message" }],
    }),
  }),
  overrideExisting: true,
})

export default followApi
export const { useLazyGetFollowListQuery, useLazyGetMsgListQuery, useChatMsgMutation } = followApi
