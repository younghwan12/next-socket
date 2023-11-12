import React, { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
// import { AiOutlineArrowLeft} from 'react-icons/ai'
import { useChatMsgMutation, useLazyGetMsgListQuery } from "@/features/chat/redux/followApi"
import { useAppSelector } from "@/redux/hooks"
import dayjs from "dayjs"
import "dayjs/locale/ko" // 한국어 로케일 추가
import Image from "next/image"
import { usePostMsgMutation } from "@/features/chat/redux/chattingApi"
import { Toast } from "primereact/toast"

dayjs.locale("ko")
const TMessageModal = (props) => {
  // 전달받은 state 함수
  const { visible, setVisible, rowData, stompClient } = props
  const [message, setMessage] = useState("")
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)
  const [getmessage, { data: msgList }] = useLazyGetMsgListQuery()
  const [sendMessage] = useChatMsgMutation()

  // const [sendMessage] = usePostMsgMutation()

  const toastRef = useRef<any>(null)

  const isCanSubmit = !!message.replace(/ |\n/g, "")
  const btnClassName = isCanSubmit ? "canSubmit" : "cannotSubmit"

  /**
   * 스크롤
   */
  const scrollRef = useRef<any>()
  const messageRef = useRef<any>()

  const [scrollState, setScrollState] = useState(true) // 자동 스크롤 여부

  useEffect(() => {
    if (rowData && token && userInfo) {
      getmessage({
        token: token.accessToken,
        room_id: rowData.roomId,
      })
    }
  }, [rowData, token, userInfo])

  useEffect(() => {
    if (rowData && rowData.not_read_chat > 0) {
      // 미읽은 채팅이 있을 때 readChat 액션 실행
      // readChat();
      console.log("ㅇ여기몇번타나")
      readChat()
    }
  }, [rowData.not_read_chat])

  const readChat = () => {}

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    requestSubmit()
  }

  // const stompDisConnect = () => {
  //   try {
  //     stomp.debug = null;
  //     stomp.disconnect(() => {
  //       stomp.unsubscribe(`/topic/chat/${userInfo?.uid}`);
  //     }, "");
  //   } catch (err) {}
  // };

  const onChatSumbmit = async (msg: string) => {
    const msgData = {
      roomId: rowData.roomId,
      // type: chatState.type as RoomType,
      participant: rowData.participant,
      sendUserId: userInfo.uid,
      message: msg,
      // rowData.participant[0].uid <-- isMe
      notRead: rowData.participant[0].uid === userInfo.uid ? 0 : rowData.participant.length,
    }
    sendMessage({ token: token.accessToken, formData: msgData })

    // sendAlert(msgData)
  }

  // roomID = 보내고자하는 대상 , 유저에게 DM을 발송
  const sendAlert = async (msg) => {
    // console.log(msg)
    if (stompClient) {
      await stompClient.send(
        `/app/dm/` + rowData.participant[0].uid,
        {},
        JSON.stringify(
          //보내는사람정보 + 메시지, 로그인 유저가 ...메시지를 특정방에 보냄
          {
            msg: message,
          }
        )
      )
      console.log("stompClient", stompClient)
    }
  }

  //구독및응답
  // useEffect(() => {
  //   if (stompClient && userInfo) {
  //     stompClient.subscribe(
  //       `/topic/dm/` + userInfo.uid,
  //       (message: { body: string }) => {
  //         const subscribedMessage = JSON.parse(message.body)
  //         toastRef.current.show({
  //           severity: "info",
  //           summary: "메시지가 도착했습니다. ",
  //           life: 2000,
  //         })
  //         // setMsgs((prevMsgs) => [...prevMsgs, subscribedMessage.chat])

  //         console.log("받은메시지", subscribedMessage)
  //       },
  //       {
  //         id: `/topic/dm/` + userInfo.uid,
  //       }
  //     )
  //   }
  // }, [stompClient])

  const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    const value = event.target.value
    setMessage(value)
  }

  const onEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // shift + enter 이면 줄바꿈이 되고, enter키만 누르면 채팅 전송이 됩니다.
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault()
      requestSubmit()
    }
  }

  const requestSubmit = () => {
    if (isCanSubmit) {
      onChatSumbmit(message)
      setMessage("")
    }
    // sendAlert(message)
  }

  const [messagesGroupBy, setMessagesGroupBy] = useState<any[]>([])

  return (
    // 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
    // <SearchModalBox onClick={clickModal}>
    <div className="messageRoom_wrapper" onClick={(e) => e.stopPropagation()}>
      {/* <div className="chattingRoom_inner"> */}
      <Toast ref={toastRef} position="top-right" />
      <header className="Header__Wrapper-sc-16ernmy-0 wPmNI">
        <button type="button" onClick={() => setVisible(!visible)}>
          {/* <AiOutlineArrowLeft /> */}
          &lt;
        </button>
        <span>{rowData.participant[0].nickname}</span>
      </header>
      <main>
        <div className="msg_wrap" ref={messageRef}>
          {/* {messagesGroupBy} */}
          {msgList && msgList.length > 0 ? (
            msgList.map((msg, index) => {
              const dateString = msg.crtrDt.replace("T", " ").replace("Z", "")
              var crtrDt = dayjs(dateString)

              // 이전 메시지의 crtrDt와 현재 메시지의 crtrDt 비교
              const showSeparator = index === 0 || !crtrDt.isSame(msgList[index - 1].crtrDt, "day")

              return (
                <div key={msg.id}>
                  {showSeparator && (
                    <div className="separator" key={msg.crtrDt}>
                      <span className="date">{crtrDt.format("YYYY년 MM월 DD일 dddd")}</span>
                    </div>
                  )}
                  <div className={`msg ${userInfo?.uid === msg.send_user_id ? "msg-me" : "msg-you"}`}>
                    <div className="chat-content dm-content">
                      <span className="status">
                        <span className="item-time">{crtrDt.format("A hh:mm")}</span>
                        {msg.not_read === 1 ? <span className="not-read">{msg.not_read}</span> : null}
                      </span>
                      <div className="txt end">
                        <span>{msg.message}</span>
                      </div>
                      {userInfo?.uid === msg.send_user_id ? null : (
                        <div className="prf">
                          <Image
                            src={`data:image/jpeg;base64, ${rowData.participant[0].profileResource}`}
                            alt="프로필"
                            width={35}
                            height={35}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>메시지가 없습니다.</div>
          )}
        </div>
      </main>
      <footer className="jPLVXV">
        <form onSubmit={onSubmit}>
          <textarea value={message} autoFocus={true} onChange={onMessageChange} onKeyPress={onEnterPress} />
          <button className={btnClassName} type="submit">
            전송
          </button>
        </form>
      </footer>
      {/* </div> */}
    </div>
    // </SearchModalBox>
  )
}

export default TMessageModal
