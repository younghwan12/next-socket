import React, { useEffect } from "react"
import { Sidebar } from "primereact/sidebar"
import Router, { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Link from "next/link"
import { getLogout } from "@/features/login/redux/loginAction"
import Image from "next/image"

interface Props {
  visible: boolean
  setVisible: any
  // profileImage: any
}

const LeftDrawer = (props: Props) => {
  const router = useRouter()
  const { token, userInfo } = useAppSelector(({ login }) => login)

  const dispatch = useAppDispatch()

  return (
    <>
      <Sidebar
        position="left"
        visible={props.visible}
        onHide={() => props.setVisible(false)}
        style={{ width: "256px" }}
      >
        {/* <aside
          className="v-navigation-drawer v-navigation-drawer--fixed v-navigation-drawer--open v-navigation-drawer--temporary theme--light"
          data-booted="true"
        > */}
        <div className="v-navigation-drawer__content">
          <div className="drawer-toolbar d-flex justify-space-between align-center">
            <p className="myP">마이페이지</p>
          </div>
          <div className="app-menu-content">
            <h2 data-v-76283c3a className="tit">
              {/* FIXME 크리에이터와 일반 유저...분기로직..... 단순화 할 필요가 있음  */}
              {userInfo?.creator_yn === "Y" ? (
                <Link href="/sapp/creator/[uid]" as={"/sapp/creator/" + userInfo?.uid}>
                  <Image
                    width={56}
                    height={56}
                    alt="img"
                    src={`data:image/jpeg;base64,${userInfo?.profileResource}`}
                    className="thmb-prf"
                  />
                </Link>
              ) : (
                <Link href="/sapp/profile/config">
                  <Image
                    width={56}
                    height={56}
                    alt="img"
                    src={`data:image/jpeg;base64,${userInfo?.profileResource}`}
                    className="thmb-prf"
                  />
                </Link>
              )}
              <div className="id">
                {userInfo?.nickname} <span>@{userInfo?.user_id}</span>
              </div>
            </h2>
            <hr data-h aria-orientation="horizontal" className="mb-4 v-divider theme--light" />
            <div className="menus">
              {/* <button type="button" className="leftdrawer-label">
                  <span className="l-i icon-star"></span>
                  <span className="l-txt">내 별</span>
                  <span className="r-i icon-right"></span>
                </button> */}
              {/* 
              <button type="button" className="leftdrawer-label" onClick={clickProfile}>
                <span className="l-i icon-profile"></span>
                <span className="l-txt">프로필</span>
                <span className="r-i icon-right"></span>
              </button> */}

              {userInfo?.creator_yn === "Y" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/studio/membership`)
                  }}
                >
                  <span className="l-i icon-creatormanage"></span>
                  <span className="l-txt">크리에이터 관리자</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              {userInfo?.creator_yn === "Y" ? (
                <button type="button" className="leftdrawer-label">
                  <span className="l-i icon-subscriber"></span>
                  <span className="l-txt">구독자</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              {userInfo?.creator_yn === "Y" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/follower`)
                  }}
                >
                  <span className="l-i icon-follower"></span>
                  <span className="l-txt">팔로워</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              <button type="button" className="leftdrawer-label">
                <span className="l-i icon-following"></span>
                <span className="l-txt">팔로잉</span>
                <span className="r-i icon-right"></span>
              </button>

              {userInfo?.creator_yn === "Y" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/managevip`)
                  }}
                >
                  <span className="l-i icon-vip"></span>
                  <span className="l-txt">VIP 관리</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              {userInfo?.creator_yn === "Y" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/revenue`)
                  }}
                >
                  <span className="l-i icon-revenue"></span>
                  <span className="l-txt">수익</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              <button
                type="button"
                className="leftdrawer-label"
                onClick={() => {
                  router.push(`/sapp/purchased`)
                }}
              >
                <span className="l-i icon-purchase"></span>
                <span className="l-txt">구매항목</span>
                <span className="r-i icon-right"></span>
              </button>
            </div>
            <div className="menus">
              {userInfo?.auth === "000" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/common/usermanage`)
                  }}
                >
                  <span className="l-i icon-usermanage"></span>
                  <span className="l-txt">사용자 관리</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              {userInfo?.auth === "000" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/common/codemanage`)
                  }}
                >
                  <span className="l-i icon-codemanage"></span>
                  <span className="l-txt">관리자 코드관리</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              {userInfo?.auth === "000" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/common/complainmanage`)
                  }}
                >
                  <span className="l-i icon-complain"></span>
                  <span className="l-txt">불만사항 접수</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              <button
                type="button"
                className="leftdrawer-label"
                onClick={() => {
                  router.push(`/sapp/setting`)
                }}
              >
                <span className="l-i icon-setting"></span>
                <span className="l-txt">설정</span>
                <span className="r-i icon-right"></span>
              </button>

              <button
                type="button"
                className="leftdrawer-label"
                onClick={() => {
                  router.push(`/sapp/helpdesk`)
                }}
              >
                <span className="l-i icon-servicecenter"></span>
                <span className="l-txt">고객센터</span>
                <span className="r-i icon-right"></span>
              </button>

              {userInfo?.auth === "000" ? (
                <button
                  type="button"
                  className="leftdrawer-label"
                  onClick={() => {
                    router.push(`/sapp/common/noticemanage`)
                  }}
                >
                  <span className="l-i icon-usermanage"></span>
                  <span className="l-txt">공지사항</span>
                  <span className="r-i icon-right"></span>
                </button>
              ) : null}

              <button
                type="button"
                className="leftdrawer-label"
                onClick={async (e) => {
                  e.preventDefault()
                  await dispatch(getLogout())
                  router.push(`/login`)
                }}
              >
                <span className="l-i icon-logout"></span>
                <span className="l-txt">로그아웃</span>
                <span className="r-i icon-right"></span>
              </button>
            </div>
            <hr aria-orientation="horizontal" className="mb-4 v-divider theme--light" />
            <div className="l-info">
              <p>서비스 이용약관</p>
              <p>개인정보 취급정책</p>
              <p>운영정책</p>
            </div>
          </div>
        </div>
        <div className="v-navigation-drawer__border"></div>
      </Sidebar>
    </>
  )
}

export default LeftDrawer
