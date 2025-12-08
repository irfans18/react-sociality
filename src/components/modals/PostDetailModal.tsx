import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MoreVertical } from 'lucide-react'
import { overlayVariants, modalVariants } from '@/motion/modal'
import { useUI } from '@/context/UIContext'
import { usePost } from '@/hooks/usePost'
import { useComments, useCreateComment } from '@/hooks/useComments'
import { PostAuthorHeader } from '@/components/post/PostAuthorHeader'
import { PostActions } from '@/components/post/PostActions'
import { PostCaption } from '@/components/post/PostCaption'
import { CommentItem } from './CommentItem'
import { CommentComposer } from './CommentComposer'

export function PostDetailModal() {
  const { postDetailModalOpen, setPostDetailModalOpen, selectedPostId } = useUI()
  const postId = selectedPostId || 0
  const { data: post, isLoading } = usePost(postId)
  const { data: commentsData } = useComments(postId)
  const createComment = useCreateComment(postId)

  const comments = commentsData?.data || []

  useEffect(() => {
    if (postDetailModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [postDetailModalOpen])

  return (
    <AnimatePresence>
      {postDetailModalOpen && selectedPostId && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setPostDetailModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-neutral-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setPostDetailModalOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-neutral-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <X size={24} />
              </button>

              {/* Left side - Image */}
              <div className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center aspect-square md:aspect-auto md:h-auto">
                {isLoading ? (
                  <div className="text-neutral-400">Loading...</div>
                ) : post?.image ? (
                  <img
                    src={post.image}
                    alt={post.caption || 'Post image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-neutral-400">No image</div>
                )}
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-1/2 flex flex-col bg-neutral-900 h-full max-h-[90vh]">
                {/* Post Header */}
                <div className="p-4 border-b border-neutral-800 shrink-0">
                  {isLoading ? (
                    <div className="text-neutral-400">Loading post...</div>
                  ) : post ? (
                    <div className="flex items-center justify-between">
                      <PostAuthorHeader author={post.author} createdAt={post.createdAt} />
                      <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-neutral-400">Post not found</div>
                  )}
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {post && (
                    <>
                      {/* Caption */}
                      <div>
                        <PostCaption caption={post.caption} authorUsername={post.author.username} />
                      </div>

                      {/* Actions */}
                      <div>
                        <PostActions post={post} />
                      </div>

                      {/* Comments Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-50 mb-4">Comments</h3>
                        {comments.length === 0 ? (
                          <div className="text-neutral-400 text-sm">No comments yet</div>
                        ) : (
                          <div className="space-y-4">
                            {comments.map((comment) => (
                              <CommentItem key={comment.id} comment={comment} />
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Comment Composer - Fixed at bottom */}
                {post && (
                  <div className="p-4 border-t border-neutral-800 shrink-0">
                    <CommentComposer
                      onSubmit={(text) => createComment.mutate(text)}
                      isLoading={createComment.isPending}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
