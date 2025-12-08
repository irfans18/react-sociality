import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { feedStagger } from '@/motion/list'
import { PostCard } from '@/components/post/PostCard'
import { useFeed } from '@/hooks/useFeed'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { BottomNav } from '@/components/navigation/BottomNav'

export function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeed()
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page?.data || []).filter((post): post is Post => {
    // Filter out undefined/null posts and validate structure
    if (!post || typeof post !== 'object') {
      console.warn('Invalid post in feed:', post)
      return false
    }
    if (!post.id || !post.author) {
      console.warn('Post missing required fields:', post)
      return false
    }
    return true
  }) || []

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
        {isLoading ? (
          <div className="text-center text-neutral-400 py-12">Loading feed...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-neutral-400 py-12">
            <p className="text-lg mb-2">No posts yet</p>
            <p className="text-sm">Follow users to see their posts in your feed</p>
          </div>
        ) : (
          <motion.div variants={feedStagger} initial="initial" animate="animate">
            <AnimatePresence>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        <div ref={observerRef} className="h-4" />
        {isFetchingNextPage && (
          <div className="text-center text-neutral-400 py-4">Loading more...</div>
        )}
      </div>
      <BottomNav />
    </motion.div>
  )
}
