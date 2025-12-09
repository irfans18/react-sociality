import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { AvatarImage } from '@/components/common/Image'
import { useSearchUsers } from '@/hooks/useSearchUsers'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { Search } from 'lucide-react'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const { data: searchData, isLoading } = useSearchUsers(query)
  const users = searchData?.data || []

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950"
    >
      <TopNavBar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="input-base w-full pl-12 pr-4 py-3 text-neutral-50 placeholder:text-neutral-500"
          />
        </div>

        {query.length === 0 ? (
          <div className="text-center text-neutral-400 py-12">
            <p>Search for users by name or username</p>
          </div>
        ) : isLoading ? (
          <div className="text-center text-neutral-400 py-12">Searching...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-neutral-400 py-12">No users found</div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.username}`}
                className="glass-card p-4 flex items-center gap-4 hover:bg-neutral-800/50 transition-colors"
              >
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  size="md"
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-semibold text-neutral-50">{user.name}</p>
                  <p className="text-sm text-neutral-400">@{user.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
