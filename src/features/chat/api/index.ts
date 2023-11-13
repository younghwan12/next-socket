import AxiosInstance from "@/api/http-common"
import queryString from "query-string"

const chattingApi = {
  getChatRoom,
  getMsg,
}

/* 채팅방 조회  */
function getChatRoom(token: string, uid: string) {
  //   const query = queryString.stringify(params, { arrayFormat: "bracket" })
  return AxiosInstance.get(`/api/chatting/roomList/${uid}`, {
    headers: {
      Authorization: bearerAuth(token),
    },
  })
}
/* 메시지 조회 */
function getMsg(token: string, room_id: string) {
  //   const query = queryString.stringify(params, { arrayFormat: "bracket" })
  return AxiosInstance.get(`/api/chatting/room?room_id=${room_id}`, {
    headers: {
      Authorization: bearerAuth(token),
    },
  })
}

function bearerAuth(token: string | undefined) {
  return `Bearer ${token}`
}

export default chattingApi
