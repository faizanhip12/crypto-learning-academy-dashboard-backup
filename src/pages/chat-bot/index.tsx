import React from 'react'
import ChatBot from 'src/@core/components/apps/chat-bot'

const Page = () => {
  return (
    <div>
      <ChatBot />
    </div>
  )
}
Page.acl = {
  action: 'itsHaveAccess',
  subject: 'chat-bot-page'
}
export default Page
