import { useAppDispatch } from "@/redux/hooks"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { getLogout } from "@/features/login/redux/loginAction"
import SLayoutLogin from "@/layout/SLayoutLogin"
import { Toast } from "primereact/toast"

const Loginpage = () => {
  const toastRef = useRef<any>(null)
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // 토큰 초기화 처리
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getLogout())
  }, [])

  const handlePhoneButtonClick = () => {
    if (!isButtonDisabled) {
      toastRef.current.show({
        severity: "info",
        summary: "준비중입니다. ",
        className: "mr-2",
        life: 1000,
      })
      setIsButtonDisabled(true)

      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 1000)
    }
  }

  return (
    <SLayoutLogin>
      <>
        <Toast ref={toastRef} position="top-right" />
        <div className="layout-frame d-flex justify-center">
          <div id="wrap" className="login">
            <div className="logo">Starlet</div>
            <div className="sText">여기서 시작하세요.</div>

            <h1 className="title-24 ">로그인</h1>
            <div className="wrap-btns ">
              <button
                className="btn-common btn-email"
                onClick={() => {
                  router.push(`/login/email`)
                }}
              >
                이메일로 로그인하기
              </button>

              <div className="mt30">
                <p className="txt-or"></p>
                <div className="wrap-circle-btns d-flex justify-center">
                  <button type="button" className="btn-common sign-btn-kakao"></button>
                  <button type="button" className="btn-common sign-btn-naver"></button>
                  <button type="button" className="btn-common sign-btn-facebook"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </SLayoutLogin>
  )
}

export default Loginpage
