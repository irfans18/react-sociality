import { motion } from 'framer-motion'
import { Image } from '@/components/common/Image'
import { useUI } from '@/context/UIContext'
import type { Post } from '@/types'

interface ImageGridProps {
  posts: Post[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
}

export function ImageGrid({ posts }: ImageGridProps) {
  const { setPostDetailModalOpen, setSelectedPostId } = useUI()

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId)
    setPostDetailModalOpen(true)
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-0.5 md:gap-4"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <button
            onClick={() => handlePostClick(post.id)}
            className="block aspect-square relative group overflow-hidden bg-neutral-900 w-full cursor-pointer"
          >
            <Image
              src={post.image}
              alt={post.caption || 'Post image'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              showSkeleton={true}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none md:pointer-events-auto">
              <div className="flex gap-4 text-white font-bold">
                {/* Optional: Add like/comment counts overlay here for desktop */}
              </div>
            </div>
          </button>
        </motion.div>
      ))}
    </motion.div>
  )
}
