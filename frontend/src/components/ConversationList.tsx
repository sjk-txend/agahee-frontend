import Avatar from './Avatar'
import ConversationMenu from './ConversationMenu'
import type { Conversation } from '../data/mockConversations'

interface ConversationListProps {
  searchTerm: string
  activeConversationId: string | null
  onSelect: (id: string) => void
  conversations: Conversation[]
  onDelete: (id: string) => void
  onToggleMute: (id: string) => void
}

function ConversationList({
  searchTerm,
  activeConversationId,
  onSelect,
  conversations,
  onDelete,
  onToggleMute,
}: ConversationListProps) {
  const filtered = conversations
    .filter((c) => !c.isDeleted)
    .filter((c) => c.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col">
      {filtered.length === 0 && (
        <p className="text-sm text-slate-400 p-4 text-center">No conversations found</p>
      )}

      {filtered.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`flex items-center gap-3 p-3 cursor-pointer border-b border-slate-100 ${
            activeConversationId === conversation.id ? 'bg-blue-50' : 'hover:bg-slate-50'
          }`}
        >
          <Avatar name={conversation.userName} />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="font-medium text-slate-800 truncate">
                {conversation.userName}
                {conversation.isMuted && <span className="ml-1 text-slate-400">🔇</span>}
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

          <ConversationMenu
            isMuted={conversation.isMuted}
            onDelete={() => onDelete(conversation.id)}
            onToggleMute={() => onToggleMute(conversation.id)}
          />
        </div>
      ))}
    </div>
  )
}

export default ConversationList