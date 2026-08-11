interface ToastProps {
  message: string
  onClose: () => void
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3">
      <span>{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white text-lg leading-none">
        &times;
      </button>
    </div>
  )
}

export default Toast