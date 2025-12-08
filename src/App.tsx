import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/context/AuthContext'
import { UIProvider } from '@/context/UIContext'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/router'
import { CreatePostModal } from '@/components/modals/CreatePostModal'
import { CommentList } from '@/components/modals/CommentList'
import { LikesDrawer } from '@/components/modals/LikesDrawer'
import { PostDetailModal } from '@/components/modals/PostDetailModal'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UIProvider>
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>
          <CreatePostModal />
          <CommentList />
          <LikesDrawer />
          <PostDetailModal />
        </UIProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
