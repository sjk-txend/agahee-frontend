function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Log in to Agahee</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage