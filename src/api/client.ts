import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token')
      const currentPath = window.location.pathname
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        window.location.href = `/login?returnTo=${encodeURIComponent(currentPath)}`
      }
    }
    return Promise.reject(error)
  }
)

// File upload helper
export const uploadFile = async (
  url: string,
  formData: FormData,
  token?: string,
  method: 'POST' | 'PATCH' = 'POST'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await axios({
    method,
    url,
    data: formData,
    baseURL: API_BASE_URL,
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  })

  // Unwrap API response if it's wrapped
  const data = response.data
  if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
    return (data as ApiResponse<any>).data
  }
  return data
}
