import { useState } from 'react'
import Avatar from './Avatar'
import { mockUsers } from '../data/mockUsers'

interface NewChatModalProps {
  onClose: () => void
  onSelectUser: (userId: string) => void
}

function NewChatModal({ onClose, onSelectUser }: NewChatModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">New Chat</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-3 border-b border-slate-200">
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-500"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 p-4 text-center">No users found</p>
          )}
          {filtered.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user.id)}
              className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-left"
            >
              <Avatar name={user.name} />
              <div>
                <p className="font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewChatModal