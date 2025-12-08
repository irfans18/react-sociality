import { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  // Drawers
  likesDrawerOpen: boolean
  setLikesDrawerOpen: (open: boolean) => void
  commentsDrawerOpen: boolean
  setCommentsDrawerOpen: (open: boolean) => void
  
  // Modals
  postDetailModalOpen: boolean
  setPostDetailModalOpen: (open: boolean) => void
  createPostModalOpen: boolean
  setCreatePostModalOpen: (open: boolean) => void
  editProfileModalOpen: boolean
  setEditProfileModalOpen: (open: boolean) => void
  
  // Selected items for modals/drawers
  selectedPostId: number | null
  setSelectedPostId: (id: number | null) => void
  
  // Toast notifications (simple implementation)
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [likesDrawerOpen, setLikesDrawerOpen] = useState(false)
  const [commentsDrawerOpen, setCommentsDrawerOpen] = useState(false)
  const [postDetailModalOpen, setPostDetailModalOpen] = useState(false)
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false)
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    // Simple toast implementation - can be enhanced with a toast library
    console.log(`[${type.toUpperCase()}] ${message}`)
    // TODO: Implement actual toast UI
  }

  return (
    <UIContext.Provider
      value={{
        likesDrawerOpen,
        setLikesDrawerOpen,
        commentsDrawerOpen,
        setCommentsDrawerOpen,
        postDetailModalOpen,
        setPostDetailModalOpen,
        createPostModalOpen,
        setCreatePostModalOpen,
        editProfileModalOpen,
        setEditProfileModalOpen,
        selectedPostId,
        setSelectedPostId,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
