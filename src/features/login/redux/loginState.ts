// import { Auth } from "@/types/socket/auth"
import { SerializedError } from "@reduxjs/toolkit"
import socketio, { Socket } from "socket.io-client"

export interface AuthState {
  // userInfo: any | undefined;
  // socket: typeof Socket | undefined;
  // token: string | null
  token: any
  userInfo: any
  errorMsg1?: string
}

export const initialState: AuthState = {
  // userInfo: undefined,
  // socket: undefined,
  // session storage에 jwt가 있는 지 확인
  // token: window.sessionStorage.getItem("jwt"),
  // 로그인 중인지 여부
  token: [],
  userInfo: [],
  errorMsg1: "",
}
