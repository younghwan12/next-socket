import { Button } from "antd"
import { useRouter } from "next/router"
import React from "react"
// import { MainContainer } from "@/features/main/component"

const MainPage = () => {
  const { push } = useRouter()
  return <Button onClick={() => push("/login")}>로그인</Button>
}

export default MainPage
