import React, { useState } from "react"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "primeicons/primeicons.css"
import Router from "next/router"
import { useAppSelector } from "@/redux/hooks"
// import BtnMakeModal from "../Modal/btnMakeModal"
import Link from "next/link"
import { LeftDrawer } from ".."

const MobileBottomMenu = () => {
  const { userInfo } = useAppSelector(({ login }) => login)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)

  const [homeActive, setHomeActive] = useState(true)
  const [searchActive, setSearchActive] = useState(false)
  const [chatActive, setChatActive] = useState(false)
  const [myActive, setMyActive] = useState(false)
  const [makeActive, setMakeActive] = useState(false)

  const goMypage = () => {
    setMyActive(true)

    setVisibleLeftDrawer(true)

    setHomeActive(false)
    setSearchActive(false)
    setChatActive(false)
    setMakeActive(false)
  }

  const goMakepage = () => {
    setMakeActive(true)

    setVisibleModal(true)
    setHomeActive(false)
    setSearchActive(false)
    setChatActive(false)
    setMyActive(false)
  }

  return (
    <>
      <nav className="bottom-navi-bar show-in-xs" style={{ paddingBottom: "0px" }} id="nav_bottom">
        <h1 className="blind">메 뉴</h1>

        <a
          className={homeActive === true ? "btn-home on" : "btn-home"}
          onClick={() => {
            setHomeActive(true)
            setSearchActive(false)
            setChatActive(false)
            setMyActive(false)
            setMakeActive(false)

            Router.push(`/sapp/menu/home`)
          }}
        >
          <div>홈</div>
        </a>

        <a
          className={searchActive === true ? "btn_search on" : "btn_search"}
          onClick={() => {
            setSearchActive(true)
            setHomeActive(false)
            setChatActive(false)
            setMyActive(false)
            setMakeActive(false)

            Router.push(`/sapp/menu/search`)
          }}
        >
          <div>탐색</div>
        </a>
        {/* {userInfo?.creator_yn === "Y" ? (
          <a className={makeActive === true ? "btn-creator on" : "btn-creator"} onClick={goMakepage}>
            <div>만들기</div>
          </a>
        ) : null}
        <a
          className={chatActive === true ? "btn-chat on" : "btn-chat"}
          onClick={() => {
            setChatActive(true)
            setSearchActive(false)
            setHomeActive(false)
            setMyActive(false)
            setMakeActive(false)

            Router.push(`/sapp/menu/chat`)
          }}
        >
          <div>메세지</div>
        </a> */}
        {/* <a className={myActive === true ? "btn-mypage on" : "btn-mypage"} onClick={goMypage}>
          <div>마이페이지</div>
        </a> */}
      </nav>
      {/* <BtnMakeModal visible={visibleModal} setVisible={setVisibleModal} /> */}
      {/* <LeftDrawer visible={visibleLeftDrawer} setVisible={setVisibleLeftDrawer} /> */}
    </>
  )
}
export default MobileBottomMenu
