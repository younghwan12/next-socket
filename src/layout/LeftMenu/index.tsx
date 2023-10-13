import Router from "next/router"
import { SetStateAction, useEffect, useState } from "react"
import { Menu } from "primereact/menu"

import LeftDrawer from "../LeftDrawer"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { useRouter } from "next/router"
import Image from "next/image"

const LeftMenu = () => {
  const router = useRouter()

  const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)
  const { token, userInfo } = useAppSelector(({ login }) => login)

  const [imageLoaded, setImageLoaded] = useState(false)

  // useEffect(() => {
  //   // 클라이언트에서 이미지 로딩 및 상태 업데이트
  //   if (userInfo?.profileResource) {
  //     setImageLoaded(true)
  //   }
  // }, [userInfo])

  return (
    <>
      <div className="left-menu-view hide-in-xs">
        <div className="bar-width">
          <div className="left-content-wrapper">
            <div className="left-content-box bar-width">
              <div className="left-item-list dis-flex">
                <div className="dis-flex profile-container">
                  {userInfo && (
                    <Image
                      src={`data:image/jpeg;base64,${userInfo?.profileResource}`}
                      width={32}
                      height={32}
                      alt="profile"
                    ></Image>
                  )}
                  <div onClick={() => setVisibleLeftDrawer(true)}>메뉴열기</div>
                </div>

                <LeftDrawer visible={visibleLeftDrawer} setVisible={setVisibleLeftDrawer} />

                <ul>
                  <li
                    // className={activeMenu === "home" ? "home active" : "home"}
                    className="home"
                    onClick={() => {
                      router.push(`/`)
                    }}
                  >
                    <span></span>
                    <p>홈</p>
                  </li>

                  <li
                    // className={activeMenu === "search" ? "search active" : "search"}
                    className="search"
                    onClick={() => {
                      router.push(`/search`)
                    }}
                  >
                    <span>{/* <img src={"/img/leftIcon02Active.svg"} /> */}</span>
                    <p>탐색</p>
                  </li>

                  <li
                    // className={activeMenu === "chat" ? "chat active" : "chat"}
                    className="chat"
                    onClick={() => {
                      router.push(`/chat`)
                    }}
                  >
                    <span>{/* <img src={"/img/leftIcon03Active.svg"} /> */}</span>
                    <p>메시지</p>
                  </li>
                  <li
                    // className={activeMenu === "alarm" ? "alarm active" : "alarm"}
                    className="alarm"
                    onClick={() => {
                      router.push(`/alarm`)
                    }}
                  >
                    <span></span>
                    <p>알림</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LeftMenu
