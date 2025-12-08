import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useUI } from '@/context/UIContext'

interface EmptyProfileStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyProfileState({ 
  title = "Your story starts here",
  description = "Share your first post and let the world see your moments, passions, and memories. Make this space truly yours.",
  actionLabel = "Upload My First Post",
  onAction
}: EmptyProfileStateProps) {
  const { setCreatePostModalOpen } = useUI()

  const handleAction = () => {
    if (onAction) {
      onAction()
    } else {
      setCreatePostModalOpen(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <h3 className="text-xl font-bold text-neutral-50 mb-3">{title}</h3>
      <p className="text-neutral-400 max-w-xs mb-8">
        {description}
      </p>
      
      {(actionLabel && (onAction || !onAction)) && (
        <button
          onClick={handleAction}
          className="w-full max-w-xs bg-primary-200 hover:bg-primary-300 text-white font-semibold py-3 px-6 rounded-pill transition-all transform active:scale-95 shadow-glow flex items-center justify-center gap-2"
        >
          {/* We only show icon if it's the default action */}
          {!onAction && <Plus size={20} />}
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  )
}
