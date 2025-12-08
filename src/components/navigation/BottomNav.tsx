import { Link, useLocation } from 'react-router-dom'
import { Home, Plus, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUI } from '@/context/UIContext'

export function BottomNav() {
  const location = useLocation()
  const { setCreatePostModalOpen } = useUI()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      className="fixed bottom-0 left-0 right-0 glass-card border-t border-neutral-800 px-4 py-3 z-50"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          to="/feed"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive('/feed') ? 'text-primary-200' : 'text-neutral-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCreatePostModalOpen(true)}
          className="bg-primary-200 hover:bg-primary-300 text-white rounded-full p-3 shadow-glow transition-colors"
        >
          <Plus size={24} />
        </motion.button>

        <Link
          to="/me"
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive('/me') ? 'text-primary-200' : 'text-neutral-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </motion.nav>
  )
}
