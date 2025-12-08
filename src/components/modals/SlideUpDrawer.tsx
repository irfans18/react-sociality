import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { drawerVariants, drawerOverlayVariants } from '@/motion/drawer'

interface SlideUpDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function SlideUpDrawer({ isOpen, onClose, title, children }: SlideUpDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={drawerOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              {title && <h2 className="text-lg font-semibold text-neutral-50">{title}</h2>}
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
