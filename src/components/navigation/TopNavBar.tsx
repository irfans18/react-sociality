import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useMyProfile } from '@/hooks/useProfile'
import logo from '/assets/logo.png'

export function TopNavBar() {
  const { isAuthenticated } = useAuth()
  const { data: profile } = useMyProfile()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-neutral-800 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/feed" className="flex items-center gap-2">
          <img src={logo} alt="Sociality" className="w-6 h-6" />
          <span className="text-xl font-bold text-white">Sociality</span>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4 flex-1 justify-center max-w-md">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                onClick={() => navigate('/users/search')}
                className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-input text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {isAuthenticated && profile && (
          <div className="flex items-center gap-2">
            <img
              src={profile.avatar || '/default-avatar.png'}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white text-sm hidden md:inline">{profile.name}</span>
          </div>
        )}
      </div>
    </nav>
  )
}
