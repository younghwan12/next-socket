import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import React, { useRef, useEffect, useState } from "react"
import { useLazyGetFollowListQuery, useLazyGetMsgListQuery } from "../../redux/followApi"
import Image from "next/image"
import MessageModal from "@/component/Modal/MessageModal"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import { config } from "@/config/config"
import dayjs from "dayjs"
import { Toast } from "primereact/toast"
import { useLazyGetUserInfoQuery, useLazyGetChatRoomQuery } from "../../redux/chattingApi"
import { Spin } from "antd"
// import { getChatRoomList } from "../../redux"
import { getChatRoomList } from "@/features/chat/redux"

const MessageContainer = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)

  // useEffect(() => {
  //   if (token && userInfo) {
  //     console.log("채팅방 조해!!")
  //     console.log("token.accessToken", token.accessToken)
  //     console.log("userInfo.uid", userInfo.uid)
  //     dispatch(
  //       getChatRoomList({
  //         token: token.accessToken,
  //         uid: userInfo.uid,
  //       })
  //     )
  //   }
  // }, [token, userInfo])
  // useEffect(() => {
  //   if (chat22) {
  //     console.log("chat22", chat22)
  //   }
  // }, [chat22])

  const toastRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  // dispatch(followingList({ token: token, uid: userInfo?.uid }));

  const [getChattingRoom, { data: chatRoomData, isFetching }] = useLazyGetChatRoomQuery()
  const [getUserInfo] = useLazyGetUserInfoQuery()
  const [rooms, setRooms] = useState([] as Array<any>)
  const [getmessage] = useLazyGetMsgListQuery()

  useEffect(() => {
    if (chatRoomData && token.accessToken && userInfo) {
      const processRooms = async () => {
        const getRoomList = chatRoomData.map(async (room) => {
          const participant = await Promise.all(
            room.participant.map(async (val) => {
              if (userInfo.uid === val) return userInfo
              const user = await getUserInfo({ uid: val, token: token.accessToken })
              return user.data
            })
          )
          return { ...room, participant }
        })

        const roomsData = await Promise.all(getRoomList) // 대기하면서 Promise 배열을 처리
        setRooms(roomsData) // 처리된 데이터를 상태에 할당
      }

      processRooms()
    }
  }, [chatRoomData, userInfo?.uid, token])

  // 로그인 성공시 팔로우리스트, socket 연동
  useEffect(() => {
    if (token.accessToken && userInfo) {
      getChattingRoom({
        token: token.accessToken,
        uid: userInfo.uid,
      })
    }
  }, [token, userInfo])
  const [visible, setVisible] = useState(false)
  const [rowData, setRowData] = useState(null)

  const onDoubleClick = (room: any) => {
    setRowData(room)
    setVisible(true)
    // joinRoom(room)
  }

  // const stompClient = useRef(null)
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)
  useEffect(() => {
    const socket = new SockJS(`${config.url.API_SOCKET_URL}`)
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

  // const stompClientRef = useRef(null)
  // useEffect(() => {
  //   const socket = new SockJS(`${config.url.API_SOCKET_URL}`)
  //   const client = Stomp.over(socket)

  //   try {
  //     client.connect(
  //       { userId: userInfo?.uid },
  //       () => {
  //         stompClientRef.current = client
  //       },
  //       (payload) => {
  //         console.log("소켓 통신 오류: ", payload)
  //       }
  //     )
  //   } catch (error) {
  //     console.error("연결 오류:", error)
  //   }

  //   return () => {
  //     if (stompClientRef.current) {
  //       stompClientRef.current.disconnect()
  //     }
  //   }
  // }, [])

  // const roomList = chatRoomData.sort((a, b) => b.updatedAt.toLocaleString().localeCompare(a.updatedAt.toLocaleString()))

  //구독및응답
  useEffect(() => {
    if (stompClient && userInfo) {
      stompClient.subscribe(
        `/topic/dm/` + userInfo.uid,
        (message: { body: string }) => {
          const subscribedMessage = JSON.parse(message.body)
          // 메시지를 구분하여 로그에 찍기
          if (subscribedMessage.sendUserId === userInfo.uid) {
            console.log("보낸메시지 :", subscribedMessage)
          } else {
            console.log("받은메시지 :", subscribedMessage)
          }
          getmessage({
            token: token.accessToken,
            room_id: subscribedMessage.roomId,
          })
          getChattingRoom({
            token: token.accessToken,
            uid: userInfo.uid,
          })

          // getChattingRoom({
          //   token: token.accessToken,
          //   uid: subscribedMessage.sendUserId,
          // })
        },
        {
          // id: `/topic/dm/` + userInfo.uid,
          id: `/topic/dm/`,
        }
      )
    }
  }, [stompClient])

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      <div
        // className="msg_container"
        className="flex justify-between !h-full"
      >
        <div className=" w-[35%] jwBxvn overflow-y-scroll">
          {/* <Spin spinning={isFetching}> */}
          {rooms
            ? rooms.map((room) => {
                return (
                  <li key={room.roomId} onDoubleClick={() => onDoubleClick(room)}>
                    <Image
                      width={56}
                      height={56}
                      alt="profile"
                      src={
                        room.participant[0].profileResource
                          ? `data:image/jpeg;base64, ${room.participant[0].profileResource}`
                          : "/chat/base_profile.jpg"
                      }
                    ></Image>
                    <p className="room-block-top">
                      <b>{room.participant[0].nickname}</b>
                      <span>{room.updDt}</span>
                    </p>
                    <p className="preview">
                      {room.last_chat}
                      {room.not_read_chat > 0 ? (
                        <span className="BaseStyle__Notification-sc-1se1zy4-5 dFciPp">
                          {room.not_read_chat <= 300 ? room.not_read_chat : "300+"}
                        </span>
                      ) : null}
                    </p>
                  </li>
                )
              })
            : null}
          {/* </Spin> */}
        </div>
        <div className="ml-5 w-[63%]">
          {visible ? (
            <MessageModal visible={visible} setVisible={setVisible} rowData={rowData} stompClient={stompClient} />
          ) : (
            <div>선택된 채팅방이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default MessageContainer
