import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('auth_token')
  })
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (token) {
      // Optionally fetch user profile on mount
      // For now, we'll rely on login to set user
    }
  }, [token])

  const login = (newToken: string, newUser: User) => {
    console.log('Login successful', newToken, newUser)
    
    // Validate token before storing
    if (!newToken || typeof newToken !== 'string' || newToken.trim() === '') {
      console.error('Invalid token provided to login:', newToken)
      throw new Error('Invalid token: token must be a non-empty string')
    }
    
    try {
      localStorage.setItem('auth_token', newToken)
      // Verify it was stored correctly
      const stored = localStorage.getItem('auth_token')
      if (stored !== newToken) {
        console.error('Token storage verification failed. Expected:', newToken, 'Got:', stored)
        throw new Error('Failed to store token in localStorage')
      }
      console.log('Token stored successfully:', stored)
    } catch (error) {
      console.error('Failed to store token in localStorage:', error)
      // Re-throw to let the caller handle it
      throw error
    }
    
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
