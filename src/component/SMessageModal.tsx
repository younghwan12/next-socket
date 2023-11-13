import React, { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
// import { AiOutlineArrowLeft} from 'react-icons/ai'
import { useChatMsgMutation, useLazyGetMsgListQuery } from "@/features/chat/redux/followApi"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import dayjs from "dayjs"
import "dayjs/locale/ko" // 한국어 로케일 추가
import Image from "next/image"
import { usePostMsgMutation } from "@/features/chat/redux/chattingApi"
import { Toast } from "primereact/toast"
import { getMsgList, updateNReadChat } from "@/features/chat/redux"

dayjs.locale("ko")
const SMessageModal = (props) => {
  // 전달받은 state 함수
  const { visible, setVisible, rowData, stompClient } = props
  const [message, setMessage] = useState("")
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)
  // const [getmessage, { data: msgList }] = useLazyGetMsgListQuery()
  const dispatch = useAppDispatch()
  const [sendMessage] = usePostMsgMutation()
  const msgList = useAppSelector((state) => state.chat.msgList)
  const toastRef = useRef<any>(null)

  const isCanSubmit = !!message.replace(/ |\n/g, "")
  const btnClassName = isCanSubmit ? "canSubmit" : "cannotSubmit"

  /**
   * 스크롤
   */
  const scrollRef = useRef<any>()
  const messageRef = useRef<any>()
  useEffect(() => {
    const scrollBottom = () => {
      if (messageRef.current) {
        scrollRef.current.scrollTop = messageRef.current.scrollHeight
      }
    }
    // 메시지 리스트가 업데이트될 때마다 스크롤을 맨 아래로 이동
    scrollBottom()
  }, [visible, msgList])

  const [scrollState, setScrollState] = useState(true) // 자동 스크롤 여부

  // useEffect(() => {
  //   if (rowData && token && userInfo) {
  //     getmessage({
  //       token: token.accessToken,
  //       room_id: rowData.roomId,
  //     })
  //   }
  // }, [rowData, token, userInfo])

  useEffect(() => {
    if (token.accessToken && userInfo.uid) {
      dispatch(
        getMsgList({
          token: token.accessToken,
          room_id: rowData.roomId,
        })
      )
    }
  }, [token?.accessToken, userInfo?.uid])

  useEffect(() => {
    if (rowData && rowData.not_read_chat > 0) {
      readChat()
    }
  }, [rowData.not_read_chat])

  const readChat = () => {
    dispatch(
      updateNReadChat({
        roomId: rowData.roomId,
        message: rowData.last_chat,
        readYN: 1,
      })
    )
  }

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
    const reduceParticipant = rowData.participant.map((item) => ({
      nickname: item.nickname,
      uid: item.uid,
      user_id: item.user_id,
    }))
    const msgData = {
      roomId: rowData.roomId,
      // type: chatState.type as RoomType,
      participant: reduceParticipant,
      sendUserId: userInfo.uid,
      message: msg,
      // rowData.participant[0].uid <-- isMe
      notRead: rowData.participant[0].uid === userInfo.uid ? 0 : rowData.participant.length,
    }
    sendMessage({ token: token.accessToken, formData: msgData })
  }

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
      <main ref={scrollRef} className="chatting_wrapper">
        <div className="msg_wrap" ref={messageRef}>
          {/* {messagesGroupBy} */}
          {msgList && msgList.length > 0 ? (
            msgList.map((msg, index) => {
              const dateString = msg.crtrDt ? msg.crtrDt.replace("T", " ").replace("Z", "") : null
              var crtrDt = dayjs(dateString)

              // 이전 메시지의 crtrDt와 현재 메시지의 crtrDt 비교
              const showSeparator = index === 0 || !crtrDt.isSame(msgList[index - 1].crtrDt, "day")

              return (
                <div key={msg.id ? msg.id : index}>
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
          <textarea
            value={message}
            autoFocus={true}
            onChange={onMessageChange}
            onKeyDown={onEnterPress}
            // onKeyPress={onEnterPress}
          />
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

export default SMessageModal
