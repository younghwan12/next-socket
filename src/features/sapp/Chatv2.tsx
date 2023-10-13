import { useAppSelector } from "@/redux/hooks"
import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import SockJS from "sockjs-client"
import Stomp from "stompjs"
import { config } from "@/config/config"
import dayjs from "dayjs"

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const StyledInput = styled.input`
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  width: 200px; /* 너비 조절 */
`

const StyledButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const Chatv2 = ({ stompClient, setMsgs, msgs }) => {
  const { token, userInfo } = useAppSelector(({ login }) => login)

  const [message, setMessage] = useState("")
  const [roomID, setRoomID] = useState(userInfo?.uid || "")

  const messageInputRef = useRef<any>(null)

  useEffect(() => {
    // 컴포넌트가 마운트될 때 포커스를 메시지 입력 필드로 이동
    messageInputRef.current.focus()
  }, [])

  const handleSendMessage = () => {
    if (!roomID) {
      setRoomID(userInfo?.uid || "")
    }

    sendMessage(message, roomID)
    setMessage("")

    // Send Message 버튼 클릭 후 포커스를 메시지 입력 필드로 이동
    messageInputRef.current.focus()
  }

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
            nickname: userInfo?.nickname,
            // + "(" + userInfo?.uid + ")",
            createdAt: dayjs(),
          }
        )
      )
      setMsgs((prevMsgs) => [
        ...prevMsgs,
        {
          userName: userInfo?.uid,
          message: content,
        },
      ])
    }
  }

  const joinRoom = (roomID) => {
    if (stompClient) {
      stompClient.send("/app/joinRoom", {}, JSON.stringify({ roomID }))
    }
  }

  return (
    <StyledDiv>
      <h1>Sub Page</h1>
      <div>
        <Label>사용자번호(=방번호)를 입력하세요</Label>
        <StyledInput
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          placeholder="bona(886), kihihi81(525) 방 이름을 입력하세요 "
        />
      </div>
      <div>
        <Label>DM 메시지 입력를 입력하세요</Label>
        <StyledInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          ref={messageInputRef} // Ref 추가
        />
      </div>

      <StyledButton onClick={handleSendMessage}>Send Message</StyledButton>
    </StyledDiv>
  )
}

export default Chatv2
