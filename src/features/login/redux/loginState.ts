import { SerializedError } from "@reduxjs/toolkit"

export const initialState = {
  loginInfo: <any>[],
  fetchLoginInfoErrors: "" as string,
  fetchLoginInfoLoading: false,

  userInfoDetail: <any>[],
  fetchUserInfoDetailLoading: false,

  stomp: <any>[],
}
