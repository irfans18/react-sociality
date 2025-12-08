import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { FeedPage } from '@/pages/FeedPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { MyProfilePage } from '@/pages/MyProfilePage'
import { EditProfilePage } from '@/pages/EditProfilePage'
import { SearchPage } from '@/pages/SearchPage'
import { PostDetailPage } from '@/pages/PostDetailPage'

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <FeedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/me',
    element: (
      <ProtectedRoute>
        <MyProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/me/edit',
    element: (
      <ProtectedRoute>
        <EditProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />,
  },
  {
    path: '/posts/:id',
    element: <PostDetailPage />,
  },
  {
    path: '/users/search',
    element: (
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/feed" replace />,
  },
])
