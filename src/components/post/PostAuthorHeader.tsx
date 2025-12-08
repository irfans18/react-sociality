import { formatDistanceToNow } from 'date-fns'
import type { User } from '@/types'

interface PostAuthorHeaderProps {
  author: User
  createdAt: string
}

export function PostAuthorHeader({ author, createdAt }: PostAuthorHeaderProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={author.avatar || '/default-avatar.png'}
        alt={author.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold text-neutral-50">{author.name}</p>
        <p className="text-sm text-neutral-400">@{author.username} · {timeAgo}</p>
      </div>
    </div>
  )
}
