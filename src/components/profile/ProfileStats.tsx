import { Link } from 'react-router-dom'
import type { Profile } from '@/types'

interface ProfileStatsProps {
  profile: Profile
  variant?: 'mobile' | 'desktop'
  className?: string
}

export function ProfileStats({ profile, variant = 'mobile', className = '' }: ProfileStatsProps) {
  // Debug: Log what we're receiving
  console.log('[ProfileStats] Profile data:', {
    postsCount: profile.postsCount,
    followersCount: profile.followersCount,
    followingCount: profile.followingCount,
    likesCount: profile.likesCount,
    fullProfile: profile,
  })

  const stats = [
    { label: 'posts', value: profile.postsCount ?? 0, to: null },
    { label: 'followers', value: profile.followersCount ?? 0, to: '/me/followers' },
    { label: 'following', value: profile.followingCount ?? 0, to: '/me/following' },
    { label: 'likes', value: profile.likesCount ?? 0, to: '/me/likes' },
  ]

  if (variant === 'desktop') {
    return (
      <div className={`flex items-center gap-10 text-base ${className}`}>
        {stats.map((stat) => (
          <div key={stat.label}>
            {stat.to ? (
              <Link to={stat.to} className="flex gap-1 hover:opacity-80 transition-opacity">
                <span className="font-bold text-neutral-50">{stat.value}</span>
                <span className="text-neutral-400">{stat.label}</span>
              </Link>
            ) : (
              <div className="flex gap-1">
                <span className="font-bold text-neutral-50">{stat.value}</span>
                <span className="text-neutral-400">{stat.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Mobile Variant (Strip)
  return (
    <div className={`flex items-center justify-between py-4 border-b border-neutral-800 mb-2 ${className}`}>
      {stats.map((stat, index) => {
        const Content = (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-neutral-50">{stat.value}</span>
            <span className="text-xs text-neutral-400 capitalize">{stat.label}</span>
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
