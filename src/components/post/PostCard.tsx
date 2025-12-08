import { motion } from 'framer-motion'
import { postCardVariants } from '@/motion/list'
import { PostAuthorHeader } from './PostAuthorHeader'
import { PostImage } from './PostImage'
import { PostActions } from './PostActions'
import { PostCaption } from './PostCaption'
import { useUI } from '@/context/UIContext'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { setPostDetailModalOpen, setSelectedPostId } = useUI()

  // Safety check for missing author data
  if (!post.author) {
    console.error('Post missing author data:', post)
    return null
  }

  const handlePostClick = () => {
    setSelectedPostId(post.id)
    setPostDetailModalOpen(true)
  }

  return (
    <motion.article
      variants={postCardVariants}
      className="glass-card p-6 mb-4"
    >
      <PostAuthorHeader author={post.author} createdAt={post.createdAt} />
      <div onClick={handlePostClick} className="cursor-pointer">
        <PostImage image={post.image} />
      </div>
      <PostActions post={post} />
      <PostCaption caption={post.caption} authorUsername={post.author.username} />
    </motion.article>
  )
}
