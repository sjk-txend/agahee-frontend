export interface Conversation {
  id: string
  userName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    userName: 'Saad Jamshed',
    lastMessage: 'Did you check the SRS v1.1 update?',
    timestamp: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    userName: 'Bilal Ishaq',
    lastMessage: 'Hello Guys/',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '3',
    userName: 'Mr. Noor',
    lastMessage: 'Looking forward to the demo',
    timestamp: 'Monday',
    unreadCount: 0,
  },
   {
    id: '4',
    userName: 'Arham',
    lastMessage: 'Lets Meet Tomorrow',
    timestamp: 'Sunday',
    unreadCount: 15,
  },
]