export interface Conversation {
  id: string
  userName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isMuted: boolean
  isDeleted: boolean
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    userName: 'Abdul Fatha',
    lastMessage: 'Did you check the file?',
    timestamp: '10:42 AM',
    unreadCount: 2,
    isMuted: false,
    isDeleted: false,
  },
  {
    id: '2',
    userName: 'Oggy Ogster',
    lastMessage: 'hello! how are you?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isMuted: false,
    isDeleted: false,
  },
  {
    id: '3',
    userName: 'Mr. Noor',
    lastMessage: 'Looking forward to the demo',
    timestamp: 'Monday',
    unreadCount: 0,
    isMuted: false,
    isDeleted: false,
  },
   {
    id: '4',
    userName: 'Arham Ishaq',
    lastMessage: 'Lets Meet Tomorrow!',
    timestamp: 'Monday',
    unreadCount: 1,
    isMuted: false,
    isDeleted: false,
  },
]