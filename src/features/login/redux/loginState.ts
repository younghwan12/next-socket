import { SerializedError } from "@reduxjs/toolkit"

export const initialState = {
  loginInfo: <any>[],
  fetchLoginInfoErrors: "" as string,
  fetchLoginInfoLoading: false,

  userInfoDetail: <any>[],
  fetchUserInfoDetailLoading: false,

  nReadChat: 1,

  stomp: <any>[],
}
