import { formatDistanceToNow } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { AvatarImage } from '@/components/common/Image'
import { commentItemVariants } from '@/motion/comments'
import { useDeleteComment } from '@/hooks/useComments'
import { useAuth } from '@/context/AuthContext'
import type { Comment } from '@/types'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const deleteComment = useDeleteComment()
  const { user } = useAuth()
  const canDelete = user?.id === comment.userId || user?.id === comment.postId

  const handleDelete = () => {
    if (confirm('Delete this comment?')) {
      deleteComment.mutate(comment.id)
    }
  }

  return (
    <motion.div
      variants={commentItemVariants}
      className="flex gap-3"
    >
      <AvatarImage
        src={comment.author.avatar}
        alt={comment.author.name}
        size="sm"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-semibold text-neutral-50">{comment.author.name}</span>
            <span className="text-neutral-400 ml-2 text-sm">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          {canDelete && (
            <button
              onClick={handleDelete}
              className="text-neutral-500 hover:text-accent-red transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
        <p className="text-neutral-200 mt-1">{comment.text}</p>
      </div>
    </motion.div>
  )
}
