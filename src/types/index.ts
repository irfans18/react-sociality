// User types
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone?: string
  bio?: string
  avatar?: string
  followersCount?: number
  followingCount?: number
  postsCount?: number
  isFollowedByMe?: boolean
  isMe?: boolean
  followsMe?: boolean
}

export interface Profile extends User {
  followersCount: number
  followingCount: number
  postsCount: number
  likesCount?: number
}

// Post types
export interface Post {
  id: number
  userId: number
  image: string
  caption?: string
  createdAt: string
  updatedAt: string
  author: User
  likesCount: number
  commentsCount: number
  isLiked: boolean
  isSaved: boolean
}

// Comment types
export interface Comment {
  id: number
  postId: number
  userId: number
  text: string
  createdAt: string
  updatedAt: string
  author: User
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  username: string
  email: string
  phone?: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// API wrapper response structure
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// API Error types
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
