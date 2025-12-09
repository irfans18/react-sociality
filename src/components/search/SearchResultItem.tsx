import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { resultItemVariants } from '@/motion/search'
import { AvatarImage } from '@/components/common/Image'
import type { User } from '@/types'

interface SearchResultItemProps {
  user: User
  onClick?: () => void
}

export function SearchResultItem({ user, onClick }: SearchResultItemProps) {
  if (!user || !user.id) {
    return null
  }

  return (
    <motion.div
      variants={resultItemVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <Link
        to={`/profile/${user.username}`}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800/50 transition-colors cursor-pointer w-full"
      >
        <AvatarImage
          src={user.avatar}
          alt={user.name || 'User'}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{user.name || 'Unknown'}</p>
          <p className="text-xs text-neutral-400 truncate">@{user.username || 'unknown'}</p>
        </div>
      </Link>
    </motion.div>
  )
}
