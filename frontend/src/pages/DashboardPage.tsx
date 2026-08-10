import { useState } from 'react'
import Avatar from '../components/Avatar'
import SearchBar from '../components/SearchBar'
import ConversationList from '../components/ConversationList'
import NewChatModal from '../components/NewChatModal'
import MessageBox from '../components/MessageBox'

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Agahee</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNewChatOpen(true)}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              New Chat
            </button>
            <Avatar name="Ayaan Shahid" />
          </div>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            searchTerm={searchTerm}
            activeConversationId={activeConversationId}
            onSelect={setActiveConversationId}
          />
        </div>
      </div>

      {/* Main chat panel */}
      <div className="flex-1 flex flex-col">
        <MessageBox conversationId={activeConversationId} />
      </div>

      {isNewChatOpen && (
        <NewChatModal
          onClose={() => setIsNewChatOpen(false)}
          onSelectUser={(userId) => {
            console.log('Start chat with user:', userId)
            setIsNewChatOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default DashboardPage