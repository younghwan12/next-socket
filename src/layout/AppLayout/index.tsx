import { config } from "@/config/config"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import dynamic from "next/dynamic"
import { io as ClientIO } from "socket.io-client"
import MobileBottomMenu from "../MobileBottomMenu"
import { LeftMenu } from ".."
import Chatv2 from "@/features/sapp/Chatv2"
import Image from "next/image"
import dayjs from "dayjs"
import "dayjs/locale/ko" // 한국어 로케일 추가

dayjs.locale("ko")

interface LayoutProps {
  // children: React.ReactNode
  sendMessage?: any
  joinRoom?: any
}

const AppLayout: React.FC<LayoutProps> = (props) => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { token, userInfo } = useAppSelector(({ login }) => login)
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)
  const [msgs, setMsgs] = useState<any>([])

  useEffect(() => {
    const socket = new SockJS(`${config.url.SOCKET_BASE_URL}`)
    const client = Stomp.over(socket)

    try {
      //FIXME 헤더에 토큰으로 변경할것!! FE&BE둘다 토큰 해석 -> validateToken
      client.connect(
        { userId: userInfo?.uid }, // 여기에 사용자 정보를 추가합니다.
        () => {
          setStompClient(client)
        },
        (payload) => {
          console.log("소켓 통신 오류: ", payload)
          //영환이
          // var message = JSON.parse(payload.body);
          // console.log("onError message: ", message);
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
  }, [])

  //구독및응답
  useEffect(() => {
    if (stompClient && userInfo) {
      stompClient.subscribe(
        `/topic/dm/` + userInfo.uid,
        (message: { body: string }) => {
          const subscribedMessage = JSON.parse(message.body)
          console.log("first", subscribedMessage)
          setMsgs((prevMsgs) => [...prevMsgs, subscribedMessage.chat])
        },
        {
          id: `/topic/dm/` + userInfo.uid,
        }
      )
    }
  }, [stompClient])

  // roomID = 보내고자하는 대상 , 유저에게 DM을 발송
  const sendMessage = (content: string, roomID: string) => {
    if (stompClient) {
      stompClient.send(
        `/app/dm/` + roomID,
        {},
        JSON.stringify(
          //보내는사람정보 + 메시지, 로그인 유저가 ...메시지를 특정방에 보냄
          {
            name: userInfo?.uid,
            message: content,
            nickname: userInfo?.nickname + "(" + userInfo?.uid + ")",
            createdAt: dayjs(),
          }
        )
      )
    }
  }

  const joinRoom = (roomID) => {
    if (stompClient) {
      stompClient.send("/app/joinRoom", {}, JSON.stringify({ roomID }))
    }
  }

  return (
    <>
      <div className="app-flex-box">
        <LeftMenu />
        <div className="main-view">
          <div className="view-content-wrapper wrapper-width">
            <div className="view-content-box">
              {/* <div className="primary-column">{props.children}</div> */}
              {/* {props.children} */}
              <Chatv2 setMsgs={setMsgs} msgs={msgs} stompClient={stompClient} />

              <div className="rcmd-column rcmd-width">
                <div className="rcmd-content-wrapper">
                  <div className="rcmd-content-box">
                    <div className="rcmd-column-content">
                      <div className="trending-stars-view">{/* <Recommend /> */}</div>
                    </div>
                  </div>
                  <div className="Content__Wrapper-sc-1cjm3se-0 uFNas">
                    {msgs.length ? (
                      msgs.map((chatMessage, i) => (
                        <div
                          key={"msg_" + i}
                          className={`chat ${chatMessage.userName === userInfo.uid ? "eTmjrj" : "gRZqBz"}`}
                        >
                          {/* Always display the sender's name */}
                          <>
                            <div className="nameBlock lcFuUq">{chatMessage.nickname}</div>
                          </>

                          <div>
                            <div
                              className={`ChatBlock__ChatWrapper-sc-1tikh8m-0 iCmNFm ${
                                chatMessage.userName === userInfo.uid ? "iCmNFm" : ""
                              }`}
                            >
                              {chatMessage.message}
                              {chatMessage.userName === userInfo.uid && <span className="not-read">1</span>}
                              <span className="time">{dayjs(chatMessage.createdAt).format("a h:mm")}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-center text-gray-600 dark:text-gray-400 py-6">No chat messages</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppLayout
