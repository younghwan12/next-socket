import SMessageModal from "@/component/SMessageModal"
import { config } from "@/config/config"
import { addSubscribedMessage, getChatRoomList, markAllMessagesAsRead, updateNReadChat } from "@/features/chat/redux"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import { useLazyGetUserInfoQuery } from "../../redux/chattingApi"
import dayjs from "dayjs"
import { Button } from "antd"

const SChattingContainer = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)

  const dispatch = useAppDispatch()
  const chattingRoom = useAppSelector((state) => state.chat.chatRoomList)
  const msgList = useAppSelector((state) => state.chat.msgList)
  useEffect(() => {
    if (token?.accessToken && userInfo?.uid) {
      dispatch(
        getChatRoomList({
          token: token.accessToken,
          uid: userInfo.uid,
        })
      )
    }
  }, [token?.accessToken, userInfo?.uid])

  const [getUserInfo] = useLazyGetUserInfoQuery()

  const [rooms, setRooms] = useState([] as Array<any>)

  useEffect(() => {
    if (chattingRoom && token.accessToken && userInfo) {
      const processRooms = async () => {
        const getRoomList = chattingRoom.map(async (room) => {
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
  }, [chattingRoom, userInfo?.uid, token])

  // 로그인 성공시 팔로우리스트, socket 연동

  const [visible, setVisible] = useState(false)
  const [rowData, setRowData] = useState(null)

  const onDoubleClick = (room: any) => {
    setRowData(room)
    setVisible(true)
    console.log("rowData", room)
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

  useEffect(() => {
    inRoom.current = visible
  }, [visible])

  const inRoom = useRef<boolean>(false)
  //구독및응답
  useEffect(() => {
    if (stompClient && userInfo) {
      stompClient.subscribe(
        `/topic/dm/` + userInfo.uid,
        (message: { body: string }) => {
          const subscribedMessage = JSON.parse(message.body)
          const now = dayjs().format("YYYY-MM-DD HH:mm:ss")
          // 메시지를 구분하여 로그에 찍기

          // 보내는사람
          const sendUser = subscribedMessage.sendUserId === userInfo.uid
          // 방안에서받는사람
          const receiveInRoom = !sendUser && inRoom.current

          // if (subscribedMessage?.chat?.nickname == "알람") {
          //   dispatch(markAllMessagesAsRead())
          // } else {
          //   // 방안에 있을시
          //   // if (inRoom.current) {
          //   //   dispatch(addSubscribedMessage({ ...subscribedMessage, crtrDt: now, notRead: 0 }))
          //   //   dispatch(
          //   //     updateNReadChat({
          //   //       roomId: rowData.roomId,
          //   //       message: rowData.last_chat,
          //   //       readYN: 1,
          //   //     })
          //   //   )
          //   // } else {
          //   if (subscribedMessage.sendUserId === userInfo.uid) {
          //     // console.log("보낸사람 :", subscribedMessage)
          //     if (inRoom.current) {
          //       console.log("보낸사람인데 방안에있다")
          //     } else {
          //       console.log("보낸사람인데 방안에없다")
          //     }
          //     dispatch(
          //       updateNReadChat({
          //         roomId: subscribedMessage.roomId,
          //         message: subscribedMessage.message,
          //         not_read_chat: 0,
          //       })
          //     )
          //   } else {
          //     // console.log("받은사람 :", subscribedMessage)
          //     if (inRoom.current) {
          //       console.log("받는사람인데 방안에있다")
          //     } else {
          //       console.log("받는사람인데 방안에없다.")
          //     }
          //     dispatch(
          //       updateNReadChat({
          //         roomId: subscribedMessage.roomId,
          //         message: subscribedMessage.message,
          //         not_read_chat: 1,
          //       })
          //     )
          //   }
          //   dispatch(addSubscribedMessage({ ...subscribedMessage, crtrDt: now, notRead: 1 }))
          //   // }
          // }
          if (subscribedMessage?.chat?.nickname == "알람") {
            dispatch(markAllMessagesAsRead())
          } else {
            // 받는 사람이 방에 있다면
            // if (receiveInRoom) {
            //   console.log("여기안타나?")
            //   dispatch(markAllMessagesAsRead())
            //   dispatch(addSubscribedMessage({ ...subscribedMessage, crtrDt: now, notRead: 0 }))
            // } else {
            // 보내는 사람만 방에 있다면
            if (subscribedMessage.sendUserId === userInfo.uid) {
              dispatch(
                updateNReadChat({
                  roomId: subscribedMessage.roomId,
                  message: subscribedMessage.message,
                  not_read_chat: 0,
                })
              )
              dispatch(addSubscribedMessage({ ...subscribedMessage, crtrDt: now, notRead: 1 }))
            } else {
              dispatch(
                updateNReadChat({
                  roomId: subscribedMessage.roomId,
                  message: subscribedMessage.message,
                  not_read_chat: 1,
                })
              )
              dispatch(addSubscribedMessage({ ...subscribedMessage, crtrDt: now, notRead: 0 }))
            }
          }
          // }
          // }
        },
        {
          id: `/topic/dm/`,
        }
      )
    }
  }, [stompClient])

  return (
    <>
      {/* <Toast ref={toastRef} position="top-right" /> */}
      <div
        // className="msg_container"
        className="flex justify-between !h-full"
      >
        <div className=" w-[35%] jwBxvn overflow-y-scroll">
          {rooms
            ? rooms.map((room) => {
                return (
                  <li key={room.roomId} onDoubleClick={() => onDoubleClick(room)}>
                    <Image
                      width={56}
                      height={56}
                      alt="profile"
                      src={
                        room.participant[0]?.profileResource
                          ? `data:image/jpeg;base64, ${room.participant[0]?.profileResource}`
                          : "/chat/base_profile.jpg"
                      }
                    ></Image>
                    <p className="room-block-top">
                      <b>{room.participant[0]?.nickname}</b>
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
        </div>
        <div className="ml-5 w-[63%]">
          {visible ? (
            <SMessageModal visible={visible} setVisible={setVisible} rowData={rowData} />
          ) : (
            <div>선택된 채팅방이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  )
}

export default SChattingContainer
