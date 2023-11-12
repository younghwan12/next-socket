import React, { useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/router"

const IndexPage = () => {
  const token = useAppSelector((state) => state.auth.loginInfo)
  const router = useRouter()

  useEffect(() => {
    if (token !== undefined) {
      router.push("/login")
    } else {
      router.push("/")
    }
  }, [token])

  return <>환영합니다. </>
}

export default IndexPage
