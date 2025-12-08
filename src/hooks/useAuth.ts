import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/api/endpoints'
import { useAuth as useAuthContext } from '@/context/AuthContext'
import type { LoginRequest, RegisterRequest } from '@/types'
import { queryClient } from '@/lib/queryClient'

export function useLogin() {
  const { login } = useAuthContext()
  
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await authApi.login(data)
      console.log('API login response:', response)
      
      // Validate response structure
      if (!response || !response.token) {
        console.error('Invalid login response - missing token:', response)
        throw new Error('Login failed: No token received from server')
      }
      
      if (!response.user) {
        console.error('Invalid login response - missing user:', response)
        throw new Error('Login failed: No user data received from server')
      }
      
      login(response.token, response.user)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })
}

export function useRegister() {
  const { login } = useAuthContext()
  
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authApi.register(data)
      console.log('API register response:', response)
      
      // Validate response structure
      if (!response || !response.token) {
        console.error('Invalid register response - missing token:', response)
        throw new Error('Registration failed: No token received from server')
      }
      
      if (!response.user) {
        console.error('Invalid register response - missing user:', response)
        throw new Error('Registration failed: No user data received from server')
      }
      
      login(response.token, response.user)
      return response
    },
    onError: (error) => {
      console.error('Registration error:', error)
    },
  })
}
