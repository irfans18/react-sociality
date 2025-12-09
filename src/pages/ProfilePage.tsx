import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { useUserProfile, useUserPosts, useUserLikes } from '@/hooks/useProfile'
import { useFollow } from '@/hooks/useFollow'
import { useAuth } from '@/context/AuthContext'
import { AvatarImage } from '@/components/common/Image'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { PostCard } from '@/components/post/PostCard'

export function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const { data: profile, isLoading } = useUserProfile(username || '')
  const { data: postsData } = useUserPosts(username || '')
  const { data: likesData } = useUserLikes(username || '')
  const { follow, unfollow, isFollowing } = useFollow(username || '')
  const { user: currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'posts' | 'likes'>('posts')

  // Use isMe from API response if available, otherwise fallback to username comparison
  const isOwnProfile = profile?.isMe ?? (currentUser?.username === username)
  const posts = activeTab === 'posts' ? (postsData?.data || []) : (likesData?.data || [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-400">Loading profile...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-400">User not found</div>
      </div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950 pb-20"
    >
      <TopNavBar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="glass-card p-6 mb-4">
          <div className="flex items-start gap-6">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              size="lg"
              className="w-24 h-24"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-50">{profile.name}</h1>
                  <p className="text-neutral-400">@{profile.username}</p>
                </div>
                {!isOwnProfile && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (profile.isFollowedByMe ? unfollow() : follow())}
                    disabled={isFollowing}
                    className={`px-6 py-2 rounded-pill font-medium transition-colors ${
                      profile.isFollowedByMe
                        ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                        : 'bg-primary-200 text-white hover:bg-primary-300'
                    }`}
                  >
                    {profile.isFollowedByMe ? 'Following' : 'Follow'}
                  </motion.button>
                )}
                {isOwnProfile && (
                  <Link
                    to="/me/edit"
                    className="px-6 py-2 rounded-pill font-medium bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>
              {profile.bio && (
                <p className="text-neutral-300 mb-4">{profile.bio}</p>
              )}
              <div className="flex gap-6">
                <div>
                  <span className="font-semibold text-neutral-50">{profile.postsCount || 0}</span>
                  <span className="text-neutral-400 ml-1">posts</span>
                </div>
                <Link to={`/profile/${username}/followers`} className="hover:opacity-80">
                  <span className="font-semibold text-neutral-50">{profile.followersCount || 0}</span>
                  <span className="text-neutral-400 ml-1">followers</span>
                </Link>
                <Link to={`/profile/${username}/following`} className="hover:opacity-80">
                  <span className="font-semibold text-neutral-50">{profile.followingCount || 0}</span>
                  <span className="text-neutral-400 ml-1">following</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-primary-200 border-b-2 border-primary-200'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === 'likes'
                ? 'text-primary-200 border-b-2 border-primary-200'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Liked
          </button>
        </div>

        {/* Posts Grid */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center text-neutral-400 py-12">
              {activeTab === 'posts' ? 'No posts yet' : 'No liked posts yet'}
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
      <BottomNav />
    </motion.div>
  )
}
