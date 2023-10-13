import React, { useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router"

const IndexPage = () => {
  const { token } = useAppSelector(({ login }) => login)
  const router = useRouter()

  useEffect(() => {
    if (token !== undefined) {
      router.push("/sapp")
    } else {
      router.push("/login")
    }
  }, [token])

  return <></>
}

export default IndexPage
