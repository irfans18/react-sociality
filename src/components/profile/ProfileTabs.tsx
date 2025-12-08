import { Camera, Plus, Bookmark, Heart } from 'lucide-react'

interface ProfileTabsProps {
  activeTab: 'posts' | 'saved' | 'liked'
  onTabChange: (tab: 'posts' | 'saved' | 'liked') => void
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="flex w-full mb-1 border-b border-neutral-800">
      <button
        onClick={() => onTabChange('posts')}
        className={`flex-1 flex items-center justify-center gap-2 pb-3 pt-2 relative transition-colors ${
          activeTab === 'posts' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
        }`}
      >
        <div className="relative">
          <Camera size={24} />
          <Plus size={12} className="absolute -top-1 -right-1" strokeWidth={3} />
        </div>
        <span className="font-medium text-sm">Gallery</span>
        {activeTab === 'posts' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
        )}
      </button>
      
      <button
        onClick={() => onTabChange('saved')}
        className={`flex-1 flex items-center justify-center gap-2 pb-3 pt-2 relative transition-colors ${
          activeTab === 'saved' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
        }`}
      >
        <Bookmark size={24} />
        <span className="font-medium text-sm">Saved</span>
        {activeTab === 'saved' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
        )}
      </button>

      <button
        onClick={() => onTabChange('liked')}
        className={`flex-1 flex items-center justify-center gap-2 pb-3 pt-2 relative transition-colors ${
          activeTab === 'liked' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
        }`}
      >
        <Heart size={24} />
        <span className="font-medium text-sm">Liked</span>
        {activeTab === 'liked' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
        )}
      </button>
    </div>
  )
}
