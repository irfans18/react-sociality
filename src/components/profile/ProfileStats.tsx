import { Link } from 'react-router-dom'
import type { Profile } from '@/types'

interface ProfileStatsProps {
  profile: Profile
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const stats = [
    { label: 'Post', value: profile.postsCount || 0, to: null },
    { label: 'Followers', value: profile.followersCount || 0, to: '/me/followers' },
    { label: 'Following', value: profile.followingCount || 0, to: '/me/following' },
    { label: 'Likes', value: profile.likesCount || 0, to: '/me/likes' },
  ]

  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-800 mb-2">
      {stats.map((stat, index) => {
        const Content = (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-50">{stat.value}</span>
            <span className="text-xs text-neutral-400">{stat.label}</span>
          </div>
        )

        return (
          <div key={stat.label} className="flex-1 flex items-center justify-center relative">
            {stat.to ? (
              <Link to={stat.to} className="hover:opacity-80 transition-opacity">
                {Content}
              </Link>
            ) : (
              Content
            )}
            {index < stats.length - 1 && (
              <div className="absolute right-0 top-2 bottom-2 w-px bg-neutral-800" />
            )}
          </div>
        )
      })}
    </div>
  )
}
