export const config = (() => {
  if (process.env.NEXT_PUBLIC_STATUS === "dev") {
    return {
      url: {
        API_BASE_URL: "http://localhost:3000",
        API_BACK_URL: "http://localhost:8000/be",
        API_LICENSE_URL: "http://localhost:3000/api/coverdreamit",

        API_SOCKET_URL: "http://localhost:8000/be/websocket",
      },
    }
  }
  return {
    url: {
      API_BASE_URL: "http://localhost:3000",
      API_BACK_URL: "http://localhost:8000/be",
      API_LICENSE_URL: "http://default-license-url.com",

      API_SOCKET_URL: "http://localhost:8000/be/websocket",
    },
  }
})()
