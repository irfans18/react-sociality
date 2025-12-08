import { useState } from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { useMyProfile, useMyPosts, useMySaved, useMyLikes } from '@/hooks/useProfile'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileInfo } from '@/components/profile/ProfileInfo'
import { ProfileStats } from '@/components/profile/ProfileStats'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { ImageGrid } from '@/components/profile/ImageGrid'
import { EmptyProfileState } from '@/components/profile/EmptyProfileState'
import { useNavigate } from 'react-router-dom'

export function MyProfilePage() {
  const { data: profile, isLoading } = useMyProfile()
  const { data: postsData } = useMyPosts()
  const { data: savedData } = useMySaved()
  const { data: likesData } = useMyLikes()
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'liked'>('posts')
  const navigate = useNavigate()

  const posts = activeTab === 'posts' 
    ? postsData?.data || []
    : activeTab === 'saved'
      ? savedData?.data || []
      : likesData?.data || []

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-400">Loading...</div>
      </div>
    )
  }

  const getEmptyStateProps = () => {
    switch (activeTab) {
      case 'saved':
        return {
          title: "No saved posts yet",
          description: "Save posts you want to see again. They will appear here.",
          actionLabel: "Explore Feed",
          onAction: () => navigate('/feed')
        }
      case 'liked':
        return {
          title: "No liked posts yet",
          description: "Posts you like will appear here. Double tap a post to like it!",
          actionLabel: "Explore Feed",
          onAction: () => navigate('/feed')
        }
      default:
        return {} // Uses default "Upload" state
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950 pb-20 md:pb-6"
    >
      {/* Mobile Header - Hidden on Desktop */}
      <ProfileHeader profile={profile} />
      
      {/* Desktop Header - Hidden on Mobile */}
      <div className="hidden md:block">
        <TopNavBar />
      </div>

      <main className="max-w-4xl mx-auto md:px-4 md:py-6">
        {/* Profile Section */}
        <div className="px-4 pt-6 md:px-0 md:pt-8">
          <ProfileInfo profile={profile} />
          
          {/* Mobile Stats - Hidden on Desktop (included in ProfileInfo for Desktop) */}
          <div className="md:hidden">
            <ProfileStats profile={profile} variant="mobile" />
          </div>

          {/* Tabs */}
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Post Grid */}
        <div className="min-h-[300px] px-4 md:px-0 pt-4">
          {posts.length === 0 ? (
            <EmptyProfileState {...getEmptyStateProps()} />
          ) : (
            <ImageGrid posts={posts} />
          )}
        </div>
      </main>
      
      <BottomNav />
    </motion.div>
  )
}
