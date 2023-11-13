import { SChattingContainer } from "@/features/chat/components"
import dynamic from "next/dynamic"

const SChatPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <SChattingContainer />
    </DynamicLayout>
  )
}

export default SChatPage
