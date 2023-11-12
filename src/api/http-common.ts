import axios from "axios"
import { config } from "@/config/config"

const instance = axios.create({
  baseURL: config?.url.API_BACK_URL,
})

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
