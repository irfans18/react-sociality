import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { likeAnimation, getLikeAnimate, saveAnimation, getSaveAnimate } from '@/motion/buttons'
import { useLike } from '@/hooks/useLike'
import { useSave } from '@/hooks/useSave'
import { useUI } from '@/context/UIContext'
import type { Post } from '@/types'

interface PostActionsProps {
  post: Post
}

export function PostActions({ post }: PostActionsProps) {
  const { like, unlike } = useLike(post.id)
  const { save, unsave } = useSave(post.id)
  const { setCommentsDrawerOpen, setLikesDrawerOpen, setSelectedPostId } = useUI()

  const handleLike = () => {
    if (post.isLiked) {
      unlike()
    } else {
      like()
    }
  }

  const handleSave = () => {
    if (post.isSaved) {
      unsave()
    } else {
      save()
    }
  }

  const handleComment = () => {
    setSelectedPostId(post.id)
    setCommentsDrawerOpen(true)
  }

  const handleLikes = () => {
    setSelectedPostId(post.id)
    setLikesDrawerOpen(true)
  }

  return (
    <div className="flex items-center gap-4 mb-3">
      <motion.button
        {...likeAnimation}
        animate={getLikeAnimate(post.isLiked)}
        onClick={handleLike}
        className="flex items-center gap-2 text-neutral-400 hover:text-accent-red transition-colors"
      >
        <Heart size={24} fill={post.isLiked ? '#D9204E' : 'none'} />
      </motion.button>
      <button
        onClick={handleLikes}
        className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
      </button>

      <button
        onClick={handleComment}
        className="flex items-center gap-2 text-neutral-400 hover:text-primary-200 transition-colors"
      >
        <MessageCircle size={24} />
        <span className="text-sm font-medium">{post.commentsCount}</span>
      </button>

      <motion.button
        {...saveAnimation}
        animate={getSaveAnimate(post.isSaved)}
        onClick={handleSave}
        className="ml-auto text-neutral-400 hover:text-primary-200 transition-colors"
      >
        <Bookmark size={24} fill={post.isSaved ? '#7F51F9' : 'none'} />
      </motion.button>

      <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
        <Share2 size={24} />
      </button>
    </div>
  )
}
