import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSubmitted, setForgotSubmitted] = useState(false)

  const resetToken = searchParams.get('token')
  const [showResetModal, setShowResetModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  useEffect(() => {
    if (resetToken) setShowResetModal(true)
  }, [resetToken])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault()
    setForgotError('')

    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email')
      return
    }

    setForgotLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setForgotSubmitted(true)
    } catch (err) {
      if (err instanceof Error) setForgotError(err.message)
    } finally {
      setForgotLoading(false)
    }
  }

  function closeForgotModal() {
    setShowForgotModal(false)
    setForgotEmail('')
    setForgotError('')
    setForgotSubmitted(false)
  }

  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResetError('')

    if (newPassword.length < 8) {
      setResetError('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match')
      return
    }

    setResetLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password: newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      setResetSuccess(true)
    } catch (err) {
      if (err instanceof Error) setResetError(err.message)
    } finally {
      setResetLoading(false)
    }
  }

  function closeResetModal() {
    setShowResetModal(false)
    setNewPassword('')
    setConfirmPassword('')
    setResetError('')
    setResetSuccess(false)
    setSearchParams({})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-400">
      <div className="bg-slate-50 p-8 rounded-3xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Log in to Agahee</h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />

          <div className="text-right -mt-2">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 relative">
            <button
              onClick={closeForgotModal}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-xl"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-lg font-bold text-slate-800 mb-2">Reset your password</h2>
            <p className="text-sm text-slate-500 mb-4">
              Enter your email and we'll send you a reset link.
            </p>

            {forgotSubmitted ? (
              <div className="bg-green-50 text-green-700 text-sm rounded-md px-3 py-3">
                If an account exists for {forgotEmail}, a reset link has been sent.
              </div>
            ) : (
              <>
                {forgotError && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-3">
                    {forgotError}
                  </div>
                )}
                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {forgotLoading ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 relative">
            <button
              onClick={closeResetModal}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-xl"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-lg font-bold text-slate-800 mb-4">Set a new password</h2>

            {resetSuccess ? (
              <div className="bg-green-50 text-green-700 text-sm rounded-md px-3 py-3">
                Password reset! You can now log in with your new password.
              </div>
            ) : (
              <>
                {resetError && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-3">
                    {resetError}
                  </div>
                )}
                <form onSubmit={handleResetSubmit} className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {resetLoading ? 'Resetting...' : 'Reset password'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage