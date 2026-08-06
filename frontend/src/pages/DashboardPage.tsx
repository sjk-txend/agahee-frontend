function DashboardPage() {
  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Agahee</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 text-slate-400 text-sm">
          Conversation list goes here
        </div>
      </div>

      {/* Main chat panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center text-slate-400">
          Select a conversation to start chatting
        </div>
      </div>
    </div>
  )
}

export default DashboardPage