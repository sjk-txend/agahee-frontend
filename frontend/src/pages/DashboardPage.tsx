import { useState } from 'react'
import Avatar from '../components/Avatar'
import SearchBar from '../components/SearchBar'
import ConversationList from '../components/ConversationList'
import NewChatModal from '../components/NewChatModal'
import ConfirmDialog from '../components/ConfirmDialog'
import Toast from '../components/Toast'
import { mockConversations, type Conversation } from '../data/mockConversations'
import { mockUsers } from '../data/mockUsers'

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  function handleSelectNewUser(userId: string) {
    const existing = conversations.find((c) => c.id === userId)

    if (!existing) {
      const user = mockUsers.find((u) => u.id === userId)
      if (!user) return

      const newConversation: Conversation = {
        id: user.id,
        userName: user.name,
        lastMessage: '',
        timestamp: 'Now',
        unreadCount: 0,
        isMuted: false,
        isDeleted: false,
      }
      setConversations([newConversation, ...conversations])
    }

    setActiveConversationId(userId)
    setIsNewChatOpen(false)
  }

  function handleToggleMute(id: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isMuted: !c.isMuted } : c))
    )
  }

  function confirmDelete() {
    if (!pendingDeleteId) return
    setConversations((prev) =>
      prev.map((c) => (c.id === pendingDeleteId ? { ...c, isDeleted: true } : c))
    )
    if (activeConversationId === pendingDeleteId) {
      setActiveConversationId(null)
    }
    setPendingDeleteId(null)
    setToastMessage('Conversation deleted')
  }

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
            <Avatar name="Bala Shekhar" />
          </div>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            searchTerm={searchTerm}
            activeConversationId={activeConversationId}
            onSelect={setActiveConversationId}
            conversations={conversations}
            onDelete={setPendingDeleteId}
            onToggleMute={handleToggleMute}
          />
        </div>
      </div>

      {/* Main chat panel */}
      <div className="flex-1 flex flex-col">
        {activeConversationId ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Chat with conversation ID: {activeConversationId}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {isNewChatOpen && (
        <NewChatModal
          onClose={() => setIsNewChatOpen(false)}
          onSelectUser={handleSelectNewUser}
        />
      )}

      {pendingDeleteId && (
        <ConfirmDialog
          message="Delete this conversation? This can't be undone from your side."
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  )
}

export default DashboardPage