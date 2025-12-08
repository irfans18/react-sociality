import { apiClient, uploadFile } from './client'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
  User,
  Profile,
  Post,
  Comment,
  PaginatedResponse,
} from '@/types'

// API response types
interface ApiPostResponse {
  id: number
  imageUrl?: string
  image?: string
  caption?: string
  createdAt: string
  updatedAt?: string
  author: {
    id: number
    username: string
    name: string
    email?: string
    avatarUrl?: string
    avatar?: string
    phone?: string
    bio?: string
  }
  likeCount?: number
  likesCount?: number
  commentCount?: number
  commentsCount?: number
  likedByMe?: boolean
  isLiked?: boolean
  savedByMe?: boolean
  isSaved?: boolean
}

interface ApiPaginatedResponse {
  items: ApiPostResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Helper to unwrap API response
function unwrapResponse<T>(response: { data: ApiResponse<T> | T }): T {
  // Check if response is wrapped in ApiResponse structure
  if (response.data && typeof response.data === 'object' && 'data' in response.data && 'success' in response.data) {
    const unwrapped = (response.data as ApiResponse<T>).data
    // Log if unwrapped data is undefined or null to help debug
    if (unwrapped === undefined || unwrapped === null) {
      console.warn('Unwrapped response data is undefined/null:', response.data)
    }
    return unwrapped
  }
  // Otherwise return as-is (for backward compatibility)
  return response.data as T
}

// Transform API profile response to match Profile interface
function transformProfile(apiProfile: any): Profile {
  if (!apiProfile) {
    // Return a default empty profile if null/undefined
    return {
      id: 0,
      name: '',
      username: '',
      email: '',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
      likesCount: 0,
    }
  }

  return {
    ...apiProfile,
    id: apiProfile.id,
    name: apiProfile.name,
    username: apiProfile.username,
    email: apiProfile.email,
    avatar: apiProfile.avatarUrl || apiProfile.avatar,
    // Handle different casing/naming conventions for stats
    postsCount: apiProfile.postsCount ?? apiProfile.postCount ?? apiProfile.posts_count ?? 0,
    followersCount: apiProfile.followersCount ?? apiProfile.followerCount ?? apiProfile.followers_count ?? 0,
    followingCount: apiProfile.followingCount ?? apiProfile.following_count ?? 0,
    likesCount: apiProfile.likesCount ?? apiProfile.likeCount ?? apiProfile.likes_count ?? 0,
    // Ensure booleans
    isFollowedByMe: !!(apiProfile.isFollowedByMe ?? apiProfile.is_followed_by_me),
    isMe: !!(apiProfile.isMe ?? apiProfile.is_me),
    followsMe: !!(apiProfile.followsMe ?? apiProfile.follows_me),
  }
}

// Transform API post response to match Post interface
function transformPost(apiPost: ApiPostResponse): Post {
  return {
    id: apiPost.id,
    userId: apiPost.author?.id || 0,
    image: (apiPost.imageUrl || apiPost.image || '') as string,
    caption: apiPost.caption,
    createdAt: apiPost.createdAt,
    updatedAt: apiPost.updatedAt || apiPost.createdAt,
    author: {
      id: apiPost.author.id,
      name: apiPost.author.name,
      username: apiPost.author.username,
      email: apiPost.author.email ?? '',
      avatar: apiPost.author.avatarUrl || apiPost.author.avatar,
      phone: apiPost.author.phone,
      bio: apiPost.author.bio,
    },
    likesCount: apiPost.likeCount || apiPost.likesCount || 0,
    commentsCount: apiPost.commentCount || apiPost.commentsCount || 0,
    isLiked: apiPost.likedByMe || apiPost.isLiked || false,
    isSaved: apiPost.savedByMe || apiPost.isSaved || false,
  }
}

// Transform paginated API response with items/pagination structure to PaginatedResponse
function transformPaginatedResponse(
  apiResponse: ApiPaginatedResponse | PaginatedResponse<Post>
): PaginatedResponse<Post> {
  // Handle API response with items/pagination structure
  if ('items' in apiResponse && 'pagination' in apiResponse) {
    const response = apiResponse as ApiPaginatedResponse
    return {
      data: response.items.map(transformPost),
      page: response.pagination.page,
      limit: response.pagination.limit,
      total: response.pagination.total,
      totalPages: response.pagination.totalPages,
    }
  }
  // Handle standard PaginatedResponse structure (already transformed or different format)
  if ('data' in apiResponse && Array.isArray(apiResponse.data)) {
    // Check if posts need transformation
    const response = apiResponse as PaginatedResponse<Post>
    return {
      data: response.data.map((post) => {
        // If already a Post, return as-is, otherwise transform
        if ('imageUrl' in post || (post as unknown as ApiPostResponse).imageUrl) {
          return transformPost(post as unknown as ApiPostResponse)
        }
        return post
      }),
      page: response.page,
      limit: response.limit,
      total: response.total,
      totalPages: response.totalPages,
    }
  }
  // Fallback: return empty response
  return {
    data: [],
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  }
}

// Auth endpoints
export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', data)
    return unwrapResponse(response)
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', data)
    return unwrapResponse(response)
  },
}

// My Profile endpoints
export const meApi = {
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<ApiResponse<Profile>>('/api/me')
    const unwrapped = unwrapResponse(response)
    return transformProfile(unwrapped)
  },

  updateProfile: async (data: FormData | Partial<User>): Promise<Profile> => {
    if (data instanceof FormData) {
      const token = localStorage.getItem('auth_token')
      const response = await uploadFile('/api/me', data, token || undefined)
      return transformProfile(response)
    } else {
      const response = await apiClient.patch<ApiResponse<Profile>>('/api/me', data)
      const unwrapped = unwrapResponse(response)
      return transformProfile(unwrapped)
    }
  },

  getPosts: async (page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>('/api/me/posts', {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },

  getLikes: async (page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>('/api/me/likes', {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },

  getSaved: async (page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>('/api/me/saved', {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },

  getFollowers: async (page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/api/me/followers', {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },

  getFollowing: async (page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/api/me/following', {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },
}

// Feed endpoints
export const feedApi = {
  getFeed: async (page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>('/api/feed', {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },
}

// Posts endpoints
export const postsApi = {
  createPost: async (image: File, caption?: string): Promise<Post> => {
    const formData = new FormData()
    formData.append('image', image)
    if (caption) {
      formData.append('caption', caption)
    }
    const token = localStorage.getItem('auth_token')
    return await uploadFile('/api/posts', formData, token || undefined)
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await apiClient.get<ApiResponse<ApiPostResponse | Post>>(`/api/posts/${id}`)
    const unwrapped = unwrapResponse(response)
    // Transform if needed
    if ('imageUrl' in unwrapped || (unwrapped as unknown as ApiPostResponse).imageUrl) {
      return transformPost(unwrapped as unknown as ApiPostResponse)
    }
    return unwrapped as Post
  },

  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/posts/${id}`)
  },
}

// Likes endpoints
export const likesApi = {
  likePost: async (postId: number): Promise<void> => {
    await apiClient.post(`/api/posts/${postId}/like`)
  },

  unlikePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/posts/${postId}/like`)
  },

  getLikes: async (postId: number, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/api/posts/${postId}/likes`, {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },
}

// Saves endpoints
export const savesApi = {
  savePost: async (postId: number): Promise<void> => {
    await apiClient.post(`/api/posts/${postId}/save`)
  },

  unsavePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/posts/${postId}/save`)
  },
}

// Comments endpoints
export const commentsApi = {
  getComments: async (postId: number, page = 1, limit = 10): Promise<PaginatedResponse<Comment>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Comment>>>(`/api/posts/${postId}/comments`, {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },

  createComment: async (postId: number, text: string): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(`/api/posts/${postId}/comments`, { text })
    return unwrapResponse(response)
  },

  deleteComment: async (commentId: number): Promise<void> => {
    await apiClient.delete(`/api/comments/${commentId}`)
  },
}

// Follow endpoints
export const followApi = {
  follow: async (username: string): Promise<void> => {
    await apiClient.post(`/api/follow/${username}`)
  },

  unfollow: async (username: string): Promise<void> => {
    await apiClient.delete(`/api/follow/${username}`)
  },
}

// Users endpoints
export const usersApi = {
  getUser: async (username: string): Promise<Profile> => {
    const response = await apiClient.get<ApiResponse<Profile>>(`/api/users/${username}`)
    const unwrapped = unwrapResponse(response)
    return transformProfile(unwrapped)
  },

  getUserPosts: async (username: string, page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>(`/api/users/${username}/posts`, {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },

  getUserLikes: async (username: string, page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<ApiResponse<ApiPaginatedResponse | PaginatedResponse<Post>>>(`/api/users/${username}/likes`, {
      params: { page, limit },
    })
    const unwrapped = unwrapResponse(response)
    return transformPaginatedResponse(unwrapped)
  },

  getUserFollowers: async (username: string, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/api/users/${username}/followers`, {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },

  getUserFollowing: async (username: string, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/api/users/${username}/following`, {
      params: { page, limit },
    })
    return unwrapResponse(response)
  },

  searchUsers: async (q: string, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/api/users/search', {
      params: { q, page, limit },
    })
    return unwrapResponse(response)
  },
}
