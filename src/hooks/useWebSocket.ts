import { useEffect, useState } from "react"
import SockJS from "sockjs-client"
import Stomp from "stompjs"

const useWebSocket = (url, userId, onMessageReceived) => {
  const [stompClient, setStompClient] = useState(null)

  useEffect(() => {
    const socket = new SockJS(url)
    const client = Stomp.over(socket)

    try {
      client.connect(
        { userId },
        () => {
          setStompClient(client)
        },
        (payload) => {
          console.log("소켓 통신 오류: ", payload)
        }
      )
    } catch (error) {
      console.error("연결 오류:", error)
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect()
      }
    }
  }, [url, userId])

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(
        `/topic/dm/` + userId,
        (message) => {
          const subscribedMessage = JSON.parse(message.body)
          onMessageReceived(subscribedMessage)
        },
        {
          id: `/topic/dm/`,
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [stompClient, userId, onMessageReceived])

  return stompClient
}

export default useWebSocket
