import React, { useEffect } from "react"
import { Button, Checkbox, Form, Input } from "antd"
// import { login } from "../../redux/loginSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { getLogin, getUserInfo } from "../../redux/loginAction"
import { parseCookies } from "nookies"

type FieldType = {
  email?: string
  username?: string
  password?: string
  remember?: string
}

const LoginContainer = () => {
  const router = useRouter()
  // const { push } = useRouter()
  const cookies = parseCookies()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.loginInfo)

  const handleFinish = (v: any) => {
    dispatch(
      getLogin({
        params: {
          email: v.email,
          password: v.password,
        },
      })
    ).then((response) => {
      if (response.type === "auth/login/fulfilled") {
        // 로그인이 성공하면 '/message' 페이지로 이동
        router.push("/message")
      }
      // router.push("/")
    })
  }

  useEffect(() => {
    if (token && token.accessToken) {
      dispatch(getUserInfo(token.accessToken))
    }
  }, [token.accessToken])

  return (
    <div className="w-[600px] mx-auto">
      <div className="page-header">
        <div className="title-row">
          <div
            onClick={() => {
              router.push(`/login`)
            }}
          >
            {`<`}
          </div>
          <h1>이메일 로그인</h1>
          <div className="spacer"></div>
        </div>
      </div>
      <Form
        className="novalidate login_input pt-5"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        <div className="wrap-inp">
          <p className="disc">
            <Link href="/" className="a">
              비밀번호를 잊으셨나요?
            </Link>
          </p>
        </div>
        <Button type="primary" htmlType="submit" className="btn">
          로그인
        </Button>
      </Form>
    </div>
  )
}

export default LoginContainer
