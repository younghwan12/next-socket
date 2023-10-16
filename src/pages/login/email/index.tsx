import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Router, { useRouter } from "next/router"
import Link from "next/link"
import { fetchUser, getLogin } from "@/features/login/redux/loginAction"
import SLayoutLogin from "@/layout/SLayoutLogin"
import { ffList } from "@/features/friends/redux/followAction"

const EmailPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [text, setText] = useState<any>([])
  const { token, userInfo } = useAppSelector(({ login }) => login)

  const handleInput = (e: any) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(
      getLogin({
        email: text.email,
        password: text.password,
      })
    )
  }

  useEffect(() => {
    if (token !== undefined) {
      fetchData()
    }
  }, [token])

  async function fetchData() {
    if (token !== undefined && token !== null && token.length !== 0) {
      //사용자 상세 정보
      await dispatch(fetchUser(token))
      Router.push(`/`)
    }
  }

  return (
    <SLayoutLogin>
      <div className="page-header">
        <div className="title-row d-flex align-center">
          <div
            onClick={() => {
              router.push(`/sapp/login`)
            }}
          >
            {`<`}
          </div>
          <h1>이메일 로그인</h1>
          <div className="spacer"></div>
        </div>
      </div>
      <form className="novalidate login_input">
        <div className="wrap-inp">
          <input
            placeholder="이메일을 입력하세요"
            className="inp-text"
            name="email"
            onChange={(e) => {
              handleInput(e)
            }}
          />
        </div>
        <div className="wrap-inp">
          <input
            className="inp-text"
            placeholder="비밀번호를 입력하세요"
            type="password"
            name="password"
            onChange={(e) => {
              handleInput(e)
            }}
          />
        </div>
        <div className="wrap-inp">
          <p className="disc">
            <Link href="/sapp/login/forgot-password" className="a">
              비밀번호를 잊으셨나요?
            </Link>
          </p>
        </div>
        <button onClick={handleSubmit} type="submit" className="btn">
          로그인
        </button>
      </form>
    </SLayoutLogin>
  )
}

export default EmailPage
