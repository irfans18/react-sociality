import { useQuery } from '@tanstack/react-query'
import { likesApi } from '@/api/endpoints'
import { SlideUpDrawer } from './SlideUpDrawer'
import { useUI } from '@/context/UIContext'
import { Link } from 'react-router-dom'

export function LikesDrawer() {
  const { likesDrawerOpen, setLikesDrawerOpen, selectedPostId } = useUI()
  const { data: likesData, isLoading } = useQuery({
    queryKey: ['likes', selectedPostId],
    queryFn: () => likesApi.getLikes(selectedPostId || 0, 1, 50),
    enabled: !!selectedPostId && likesDrawerOpen,
  })

  const users = likesData?.data || []

  return (
    <SlideUpDrawer
      isOpen={likesDrawerOpen}
      onClose={() => setLikesDrawerOpen(false)}
      title="Likes"
    >
      <div className="space-y-2">
        {isLoading ? (
          <div className="text-center text-neutral-400 py-8">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-neutral-400 py-8">No likes yet</div>
        ) : (
          users.map((user) => (
            <Link
              key={user.id}
              to={`/profile/${user.username}`}
              onClick={() => setLikesDrawerOpen(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-neutral-50">{user.name}</p>
                <p className="text-sm text-neutral-400">@{user.username}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </SlideUpDrawer>
  )
}
