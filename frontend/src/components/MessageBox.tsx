import { useState } from 'react'
import { mockConversations } from '../data/mockConversations'
import Avatar from './Avatar'

interface MessageBoxProps {
  conversationId: string | null
}

interface MessageItem {
  id: string
  text: string
  sender: 'me' | 'them'
  time: string
}

function MessageBox({ conversationId }: MessageBoxProps) {
  const [draft, setDraft] = useState('')

  const [messagesByConversation, setMessagesByConversation] = useState<
    Record<string, MessageItem[]>
  >(() => ({
    '1': [
      {
        id: '1',
        text: 'Did you check the SRS v1.1 update?',
        sender: 'them',
        time: '10:42',
      },
    ],
    '2': [
      {
        id: '2',
        text: 'Hello Guys/',
        sender: 'them',
        time: 'Yesterday',
      },
    ],
    '3': [
      {
        id: '3',
        text: 'Looking forward to the demo',
        sender: 'them',
        time: 'Monday',
      },
    ],
    '4': [
      {
        id: '4',
        text: 'Lets Meet Tomorrow',
        sender: 'them',
        time: 'Sunday',
      },
    ],
  }))

  const conversation = mockConversations.find(
    (c) => c.id === conversationId
  )

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a conversation to start chatting
      </div>
    )
  }

  const messages = messagesByConversation[conversation.id] ?? []

  const handleSend = () => {
    const text = draft.trim()

    if (!text) return

    const newMessage: MessageItem = {
      id: `${conversation.id}-${Date.now()}`,
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      }),
    }

    setMessagesByConversation((prev) => ({
      ...prev,
      [conversation.id]: [
        ...(prev[conversation.id] ?? []),
        newMessage,
      ],
    }))

    setDraft('')

    window.setTimeout(() => {
      const reply: MessageItem = {
        id: `${conversation.id}-reply-${Date.now()}`,
        text: 'Received your message.',
        sender: 'them',
        time: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
      }

      setMessagesByConversation((prev) => ({
        ...prev,
        [conversation.id]: [
          ...(prev[conversation.id] ?? []),
          reply,
        ],
      }))
    }, 600)
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar name={conversation.userName} size="md" />
          <div className="font-medium text-slate-800">
            {conversation.userName}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col">
          <div className="flex-1 overflow-y-auto rounded-lg bg-white p-4 shadow-sm">
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-sm text-slate-400">
                  No messages yet.
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'me'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-[10px] opacity-70">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSend()
                }
              }}
              placeholder="Type a message"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleSend}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBox