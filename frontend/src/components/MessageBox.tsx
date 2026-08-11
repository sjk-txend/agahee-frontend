import { mockConversations } from '../data/mockConversations'
import Avatar from './Avatar'

interface MessageBoxProps {
  conversationId: string | null
}

function MessageBox({ conversationId }: MessageBoxProps) {
  const conversation = mockConversations.find((c) => c.id === conversationId)

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a conversation to start chatting
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar name={conversation.userName} size="md" />
          <div className="font-medium text-slate-800">{conversation.userName}</div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
        <div className="mx-auto w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[300px]">
            <div className="prose text-slate-700">
              {conversation.lastMessage || 'No messages yet.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
