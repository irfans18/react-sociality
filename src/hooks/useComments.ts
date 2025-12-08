import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '@/api/endpoints'
import type { Comment } from '@/types'

export function useComments(postId: number) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.getComments(postId, 1, 10),
    enabled: !!postId,
  })
}

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (text: string) => commentsApi.createComment(postId, text),
    onMutate: async (text: string) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] })
      
      const previousComments = queryClient.getQueryData<{ data: Comment[] }>(['comments', postId])
      
      // Optimistically add comment (we'll need user from context)
      // For now, just invalidate
      
      return { previousComments }
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', postId], context.previousComments)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (commentId: number) => commentsApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}
