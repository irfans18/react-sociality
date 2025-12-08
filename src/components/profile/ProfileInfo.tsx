import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import type { Profile } from '@/types'
import { ProfileStats } from './ProfileStats'

interface ProfileInfoProps {
  profile: Profile
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-12 mb-6 md:mb-12">
      {/* Avatar Section */}
      <div className="shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
        <div className="p-1 rounded-full border-2 border-neutral-800">
          <img
            src={profile.avatar || '/default-avatar.png'}
            alt={profile.name}
            className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header Row: Username + Actions */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-light text-neutral-50">{profile.username}</h2>
          
          <div className="flex items-center gap-2">
            <Link
              to="/me/edit"
              className="px-6 py-1.5 bg-neutral-800 text-white rounded-lg font-semibold text-sm hover:bg-neutral-700 transition-colors"
            >
              Edit Profile
            </Link>
            <button className="p-2 text-white hover:opacity-80 transition-opacity">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Stats (Hidden on Mobile) */}
        <div className="hidden md:block mb-6">
          <ProfileStats profile={profile} variant="desktop" />
        </div>

        {/* Name + Bio */}
        <div className="text-center md:text-left">
          <div className="font-semibold text-neutral-50 mb-1">{profile.name}</div>
          {profile.bio && (
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap max-w-2xl">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
