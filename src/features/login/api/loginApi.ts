import AxiosInstance from "@/api/http-common"

const loginApi = {
  login,
  fetchUser,
}
function login(formData: any) {
  return AxiosInstance.post(`/api/auth/login`, formData, {
    headers: {
      "Content-Type": `application/json`,
    },
  })
}

function fetchUser(token: string) {
  return AxiosInstance.get(`/api/users/me`, {
    headers: {
      Authorization: bearerAuth(token),
    },
  })
}

export default loginApi
function bearerAuth(token: string | undefined) {
  return `Bearer ${token}`
}
