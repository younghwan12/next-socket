import React, { useEffect } from "react"
import { Button, Checkbox, Form, Input } from "antd"
import { login } from "../../redux/loginSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router"

type FieldType = {
  id?: string
  username?: string
  password?: string
  remember?: string
}

const LoginContainer = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const onFinish = (v: any) => {
    // console.log(loginInfo)
    dispatch(login(v))
    push("/friends")
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: "0 auto" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="DataBase Id (PK)"
        name="id"
        rules={[{ required: true, message: "Please input your Id!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item<FieldType> label="room" name="room" rules={[{ required: true, message: "숫자를 입력해주세요!" }]}>
        <Input />
      </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit">입장하기</Button>
      </Form.Item>
    </Form>
  )
}

export default LoginContainer
