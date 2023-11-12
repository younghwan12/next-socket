import AxiosInstance from "@/api/http-common"

const loginApi = {
  login,
  getUserInfo,
}
function login(formData: any) {
  return AxiosInstance.post(`/api/auth/login`, formData, {
    headers: {
      "Content-Type": `application/json`,
    },
  })
}

function getUserInfo(token: string) {
  return AxiosInstance.get(`/api/users/me`, {
    headers: {
      Authorization: bearerAuth(token),
    },
  })
}

function bearerAuth(token: string | undefined) {
  return `Bearer ${token}`
}

export default loginApi
