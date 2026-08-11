import { useState, useRef, useEffect } from 'react'

interface ConversationMenuProps {
  isMuted: boolean
  onDelete: () => void
  onToggleMute: () => void
}

function ConversationMenu({ isMuted, onDelete, onToggleMute }: ConversationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        className="text-slate-400 hover:text-slate-600 px-1"
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 top-6 bg-white border border-slate-200 rounded-lg shadow-md w-36 z-10 overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleMute()
              setIsOpen(false)
            }}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
              setIsOpen(false)
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ConversationMenu