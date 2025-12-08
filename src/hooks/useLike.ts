import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likesApi } from '@/api/endpoints'
import type { Post } from '@/types'

export function useLike(postId: number) {
  const queryClient = useQueryClient()
  
  const likeMutation = useMutation({
    mutationFn: () => likesApi.likePost(postId),
    onMutate: async () => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['post', postId] })
      await queryClient.cancelQueries({ queryKey: ['feed'] })
      
      const previousPost = queryClient.getQueryData<Post>(['post', postId])
      const previousFeed = queryClient.getQueryData(['feed'])
      
      // Update post
      if (previousPost) {
        queryClient.setQueryData<Post>(['post', postId], {
          ...previousPost,
          isLiked: true,
          likesCount: previousPost.likesCount + 1,
        })
      }
      
      // Update feed
      queryClient.setQueriesData<{ pages: Array<{ data: Post[] }> }>(
        { queryKey: ['feed'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post.id === postId
                  ? { ...post, isLiked: true, likesCount: post.likesCount + 1 }
                  : post
              ),
            })),
          }
        }
      )
      
      return { previousPost, previousFeed }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost)
      }
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
  
  const unlikeMutation = useMutation({
    mutationFn: () => likesApi.unlikePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] })
      await queryClient.cancelQueries({ queryKey: ['feed'] })
      
      const previousPost = queryClient.getQueryData<Post>(['post', postId])
      const previousFeed = queryClient.getQueryData(['feed'])
      
      if (previousPost) {
        queryClient.setQueryData<Post>(['post', postId], {
          ...previousPost,
          isLiked: false,
          likesCount: Math.max(0, previousPost.likesCount - 1),
        })
      }
      
      queryClient.setQueriesData<{ pages: Array<{ data: Post[] }> }>(
        { queryKey: ['feed'] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post.id === postId
                  ? { ...post, isLiked: false, likesCount: Math.max(0, post.likesCount - 1) }
                  : post
              ),
            })),
          }
        }
      )
      
      return { previousPost, previousFeed }
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost)
      }
      if (context?.previousFeed) {
        queryClient.setQueryData(['feed'], context.previousFeed)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
  
  return {
    like: likeMutation.mutate,
    unlike: unlikeMutation.mutate,
    isLiking: likeMutation.isPending || unlikeMutation.isPending,
  }
}
