import AxiosInstance from "@/api/http-common"
import queryString from "query-string"

const followApi = {
  ffList,
}

function ffList(token: string, uid: any) {
  return AxiosInstance.get(`/api/chat/getFF/${uid}`, {
    headers: {
      "Content-Type": `application/json`,
      Authorization: bearerAuth(token),
    },
  })
}

export default followApi

function bearerAuth(token: string | undefined) {
  return `Bearer ${token}`
}
