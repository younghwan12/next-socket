import React, { useEffect, useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MessageOutlined,
} from "@ant-design/icons"
import { Menu, Button, theme, Layout as AntdLayout, Badge, Avatar } from "antd"
import Image from "next/image"
import { BellOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import Link from "next/link"
const { Header, Sider, Content } = AntdLayout
import type { MenuProps } from "antd"
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logout } from "@/features/login/redux/loginSlice"
import { useLazyGetChatRoomQuery } from "@/features/chat/redux/chattingApi"
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  // const [getChattingRoom, { data: chatRoomData, isFetching }] = useLazyGetChatRoomQuery()
  const chattingRoom = useAppSelector((state) => state.chat.chatRoomList)
  const totalNotReadNum = chattingRoom ? chattingRoom.reduce((acc, curr) => acc + curr.not_read_chat, 0) : 0
  // const loginInfo = useAppSelector((state) => state.auth.loginInfo)
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)
  const items: MenuProps["items"] = [
    {
      key: "6",
      label: <Link href="/chat">CHAT</Link>,
    },
    {
      key: "7",
      label: <Link href="/message">chat with toolkit</Link>,
    },
  ]
  // useEffect(() => {
  //   if (token.accessToken && userInfo) {
  //     getChattingRoom({
  //       token: token.accessToken,
  //       uid: userInfo.uid,
  //     })
  //   }
  // }, [token, userInfo])

  const router = useRouter()
  const [currentMenu, setCurrentMenu] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const currentMenuItem = router.pathname.substring(1) || "flowchart"

  const logOutFunc = () => {
    dispatch(logout(null))
    router.push("/login")
  }

  return (
    <AntdLayout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        {/* <div className="px-3 py-5 min-h-[64px]">
          <Image className="mx-auto" alt="logo" width="163" height="163" src="/images/logo.png" />
        </div> */}
        <div className="demo-logo" />
        <Menu mode="inline" selectedKeys={[currentMenuItem]} items={items} />
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0, background: colorBgContainer, position: "relative" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {userInfo?.uid ? (
            <>
              <Badge count={totalNotReadNum}>
                <BellOutlined style={{ fontSize: 24 }} />
              </Badge>
              <Button className="login_btn" onClick={logOutFunc}>
                로그아웃
              </Button>
            </>
          ) : (
            <Button className="login_btn" onClick={() => router.push("/login")}>
              로그인
            </Button>
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </AntdLayout>
      {/* <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
        <FloatButton tooltip="다크 모드" icon={<CommentOutlined />} />
        <FloatButton tooltip="문의 하기" icon={<MessageOutlined />} />
      </FloatButton.Group> */}
    </AntdLayout>
  )
}

export default Layout
