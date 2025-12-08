import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { Profile } from '@/types'

interface ProfileHeaderProps {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-40 bg-neutral-950 border-b border-neutral-800 px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-neutral-50 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-neutral-50">{profile.name}</h1>
        </div>
        <img
          src={profile.avatar || '/default-avatar.png'}
          alt={profile.name}
          className="w-8 h-8 rounded-full object-cover border border-neutral-800"
        />
      </div>
    </div>
  )
}
