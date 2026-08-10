import Avatar from './Avatar'
import { mockConversations } from '../data/mockConversations'

interface ConversationListProps {
  searchTerm: string
}

function ConversationList({ searchTerm }: ConversationListProps) {
  const filtered = mockConversations.filter((conversation) =>
    conversation.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      {filtered.length === 0 && (
        <p className="text-sm text-slate-400 p-4 text-center">No conversations found</p>
      )}

      {filtered.map((conversation) => (
        <button
          key={conversation.id}
          className="flex items-center gap-3 p-3 hover:bg-slate-50 text-left border-b border-slate-100"
        >
          <Avatar name={conversation.userName} />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="font-medium text-slate-800 truncate">
                {conversation.userName}
              </span>
              <span className="text-xs text-slate-400 shrink-0 ml-2">
                {conversation.timestamp}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate">{conversation.lastMessage}</p>
          </div>

          {conversation.unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default ConversationList