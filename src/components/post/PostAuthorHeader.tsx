import { formatDistanceToNow } from 'date-fns'
import { AvatarImage } from '@/components/common/Image'
import type { User } from '@/types'

interface PostAuthorHeaderProps {
  author: User
  createdAt: string
}

export function PostAuthorHeader({ author, createdAt }: PostAuthorHeaderProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  return (
    <div className="flex items-center gap-3 mb-4">
      <AvatarImage
        src={author.avatar}
        alt={author.name}
        size="md"
      />
      <div className="flex-1">
        <p className="font-semibold text-neutral-50">{author.name}</p>
        <p className="text-sm text-neutral-400">@{author.username} · {timeAgo}</p>
      </div>
    </div>
  )
}
