import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { overlayVariants, modalVariants } from '@/motion/modal'
import { UploadDropzone } from '@/components/upload/UploadDropzone'
import { ImagePreview } from '@/components/upload/ImagePreview'
import { CaptionField } from '@/components/upload/CaptionField'
import { GradientButton } from '@/components/auth/GradientButton'
import { useCreatePost } from '@/hooks/usePost'
import { useUI } from '@/context/UIContext'

export function CreatePostModal() {
  const { createPostModalOpen, setCreatePostModalOpen, showToast } = useUI()
  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const createPost = useCreatePost()

  const handleFileSelect = (file: File) => {
    setImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return

    createPost.mutate(
      { image, caption: caption || undefined },
      {
        onSuccess: () => {
          setImage(null)
          setCaption('')
          setCreatePostModalOpen(false)
          showToast('Post created successfully!', 'success')
        },
        onError: () => {
          showToast('Failed to create post', 'error')
        },
      }
    )
  }

  return (
    <AnimatePresence>
      {createPostModalOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setCreatePostModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <h2 className="text-xl font-semibold text-neutral-50">Create Post</h2>
                <button
                  onClick={() => setCreatePostModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {!image ? (
                  <UploadDropzone onFileSelect={handleFileSelect} />
                ) : (
                  <>
                    <ImagePreview
                      file={image}
                      onRemove={() => setImage(null)}
                    />
                    <CaptionField
                      label="Caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                    />
                  </>
                )}
                <div className="flex gap-4">
                  <GradientButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setImage(null)
                      setCaption('')
                      setCreatePostModalOpen(false)
                    }}
                  >
                    Cancel
                  </GradientButton>
                  <GradientButton
                    type="submit"
                    disabled={!image || createPost.isPending}
                    isLoading={createPost.isPending}
                  >
                    Post
                  </GradientButton>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
