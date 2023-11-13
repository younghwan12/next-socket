import { ChattingContainer } from "@/features/chat/components"
import dynamic from "next/dynamic"

const ChatPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <ChattingContainer />
    </DynamicLayout>
  )
}

export default ChatPage
