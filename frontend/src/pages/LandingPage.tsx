import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-400 p-4">
      {/* Main Container Card */}
      <div className="bg-slate-50 p-8 rounded-3xl shadow-md w-full max-w-md text-center">
        {/* Header / Brand */}
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Agahee</h1>
        <p className="text-sm text-slate-600 mb-6">
          A simple and secure business chat application for messaging and team collaboration.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <Link
            to="/login"
            className="bg-blue-600 text-white rounded-md py-2.5 font-medium hover:bg-blue-700 transition-colors text-center shadow-sm"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-white text-slate-700 border border-slate-300 rounded-md py-2.5 font-medium hover:bg-slate-100 transition-colors text-center"
          >
            Sign Up
          </Link>
        </div>

        {/* Features Summary */}
        <div className="border-t border-slate-200 pt-6 text-left">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
            Key Features
          </h2>
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-800">Real-Time Messaging</h3>
              <p className="text-xs text-slate-500">Instant 1-to-1 chat with team members.</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-800">File Sharing</h3>
              <p className="text-xs text-slate-500">Easily share documents within conversations.</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-800">Secure Authentication</h3>
              <p className="text-xs text-slate-500">Protected user accounts powered by JWT.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
