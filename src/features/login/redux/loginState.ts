// import { Auth } from "@/types/socket/auth"
import { SerializedError } from "@reduxjs/toolkit";
import socketio, { Socket } from "socket.io-client";

export interface AuthState {
  // auth: Auth | undefined
  userInfo: any | undefined;
  socket: typeof Socket | undefined;
  // token: string | null
}

export const initialState: AuthState = {
  userInfo: undefined,
  socket: undefined,
  // session storage에 jwt가 있는 지 확인
  // token: window.sessionStorage.getItem("jwt"),
  // 로그인 중인지 여부
};

if (initialState) {
  // token에서 회원 정보를 얻습니다.
  // initialState.auth = jwtDecode(initialState.token) as Auth;
  // // 서버와 소켓 연결
  // initialState.socket = socketio.connect(HOST);
}

// export const initialState: AuthState = {
//   loginInfo: <any>{},
//   //   fetchUserInfoErrors: <SerializedError>[],
//   //   fetchUserInfoLoading: false,
// }
