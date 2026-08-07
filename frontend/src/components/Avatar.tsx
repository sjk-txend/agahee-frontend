interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

function Avatar({ name, size = 'md' }: AvatarProps) {
  const initials = name
    .trim()
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shrink-0`}
    >
      {initials}
    </div>
  )
}

export default Avatar