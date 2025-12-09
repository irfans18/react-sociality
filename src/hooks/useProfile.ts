import { meApi, usersApi } from '@/api/endpoints'
import type { Profile } from '@/types'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

export function useMyProfile() {
  return useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => meApi.getProfile(),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: FormData | Partial<Profile>) => meApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => usersApi.getUser(username),
    enabled: !!username,
  })
}

export function useUserPosts(username: string) {
  return useQuery({
    queryKey: ['user', username, 'posts'],
    queryFn: () => usersApi.getUserPosts(username, 1, 20),
    enabled: !!username,
  })
}

export function useUserLikes(username: string) {
  return useQuery({
    queryKey: ['user', username, 'likes'],
    queryFn: () => usersApi.getUserLikes(username, 1, 20),
    enabled: !!username,
  })
}

export function useMyPosts() {
  return useQuery({
    queryKey: ['me', 'posts'],
    queryFn: () => meApi.getPosts(1, 20),
  })
}

export function useMyLikes() {
  return useQuery({
    queryKey: ['me', 'likes'],
    queryFn: () => meApi.getLikes(1, 20),
  })
}

export function useMySaved() {
  return useQuery({
    queryKey: ['me', 'saved'],
    queryFn: () => meApi.getSaved(1, 20),
  })
}
