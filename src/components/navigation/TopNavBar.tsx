import { Link } from 'react-router-dom'
import { AvatarImage } from '@/components/common/Image'
import { useAuth } from '@/context/AuthContext'
import { useMyProfile } from '@/hooks/useProfile'
import { SearchBar } from '@/components/search/SearchBar'
import logo from '/assets/logo.png'

export function TopNavBar() {
  const { isAuthenticated } = useAuth()
  const { data: profile } = useMyProfile()

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-neutral-800 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/feed" className="flex items-center gap-2">
          <img src={logo} alt="Sociality" className="w-6 h-6" />
          <span className="text-xl font-bold text-white">Sociality</span>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <SearchBar />
          </div>
        )}

        {isAuthenticated && profile && (
          <div className="flex items-center gap-2">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              size="sm"
            />
            <span className="text-white text-sm hidden md:inline">{profile.name}</span>
          </div>
        )}
      </div>
    </nav>
  )
}
