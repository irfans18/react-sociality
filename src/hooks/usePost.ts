import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '@/api/endpoints'
import type { Post } from '@/types'

export function usePost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ image, caption }: { image: File; caption?: string }) =>
      postsApi.createPost(image, caption),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'posts'] })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'posts'] })
    },
  })
}
