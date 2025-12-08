import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { usePost } from '@/hooks/usePost'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { PostCard } from '@/components/post/PostCard'
import { ArrowLeft } from 'lucide-react'

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const postId = id ? parseInt(id, 10) : 0
  const { data: post, isLoading, error } = usePost(postId)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950 pb-20"
    >
      <TopNavBar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {isLoading ? (
          <div className="text-center text-neutral-400 py-12">Loading post...</div>
        ) : error || !post ? (
          <div className="text-center text-neutral-400 py-12">
            <p className="text-lg mb-2">Post not found</p>
            <p className="text-sm">The post you're looking for doesn't exist or has been deleted.</p>
          </div>
        ) : (
          <PostCard post={post} />
        )}
      </div>
      <BottomNav />
    </motion.div>
  )
}
