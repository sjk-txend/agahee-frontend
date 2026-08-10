import { useState } from 'react'
import Avatar from '../components/Avatar'
import SearchBar from '../components/SearchBar'
import ConversationList from '../components/ConversationList'

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Agahee</h2>
          <Avatar name="Mr oggy" />
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
  {activeConversationId ? (
    <div className="flex-1 flex items-center justify-center text-slate-400">
      Chat with conversation ID: {activeConversationId} (messages coming next)
    </div>
  ) : (
    <div className="flex-1 flex items-center justify-center text-slate-400">
      Select a conversation to start chatting
    </div>
  )}
</div>
    </div>
  )
}

export default DashboardPage