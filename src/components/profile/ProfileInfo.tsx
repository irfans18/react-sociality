import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import type { Profile } from '@/types'

interface ProfileInfoProps {
  profile: Profile
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <img
            src={profile.avatar || '/default-avatar.png'}
            alt={profile.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-neutral-900 ring-2 ring-neutral-800"
          />
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-50">{profile.name}</h2>
            <p className="text-neutral-400">@{profile.username}</p>
          </div>
        </div>
      </div>
      
      {profile.bio && (
        <p className="text-neutral-200 text-sm md:text-base leading-relaxed max-w-2xl">
          {profile.bio}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Link
          to="/me/edit"
          className="flex-1 md:flex-none md:w-48 text-center px-4 py-2 border border-neutral-700 bg-transparent text-neutral-50 rounded-pill font-medium hover:bg-neutral-900 transition-colors"
        >
          Edit Profile
        </Link>
        <button className="p-2 border border-neutral-700 rounded-full text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900 transition-colors">
          <Send size={20} className="-ml-0.5 mt-0.5" /> {/* Optically center the icon */}
        </button>
      </div>
    </div>
  )
}
