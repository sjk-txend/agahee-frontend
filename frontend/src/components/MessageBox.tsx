import { useState } from 'react'
import { mockConversations } from '../data/mockConversations'
import Avatar from './Avatar'

interface MessageBoxProps {
  conversationId: string | null
}

function MessageBox({ conversationId }: MessageBoxProps) {
  const [showInfo, setShowInfo] = useState(false)
  const conversation = mockConversations.find((c) => c.id === conversationId)

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a conversation to start chatting
      </div>
    )
  }

  return (
    <div className="relative flex-1 flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowInfo((value) => !value)}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Avatar name={conversation.userName} size="md" />
            </button>
            <div className="font-medium text-slate-800">{conversation.userName}</div>
          </div>
          <button
            type="button"
            onClick={() => setShowInfo((value) => !value)}
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            {showInfo ? 'Hide info' : 'View info'}
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="bg-white border-b border-slate-200 p-4 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Name</p>
              <p className="text-sm font-medium text-slate-900">{conversation.userName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Email</p>
              <p className="text-sm text-slate-700">
                {conversation.userName.replace(/\s+/g, '.').toLowerCase()}@example.com
              </p>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
            >
              Block user
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
        <div className="mx-auto w-full max-w-4xl h-full">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full min-h-[400px]">
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
