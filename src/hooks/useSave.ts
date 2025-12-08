import { useMutation, useQueryClient } from '@tanstack/react-query'
import { savesApi } from '@/api/endpoints'
import type { Post } from '@/types'

export function useSave(postId: number) {
  const queryClient = useQueryClient()
  
  const saveMutation = useMutation({
    mutationFn: () => savesApi.savePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] })
      await queryClient.cancelQueries({ queryKey: ['feed'] })
      
      const previousPost = queryClient.getQueryData<Post>(['post', postId])
      
      if (previousPost) {
        queryClient.setQueryData<Post>(['post', postId], {
          ...previousPost,
          isSaved: true,
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
                post.id === postId ? { ...post, isSaved: true } : post
              ),
            })),
          }
        }
      )
      
      return { previousPost }
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'saved'] })
    },
  })
  
  const unsaveMutation = useMutation({
    mutationFn: () => savesApi.unsavePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] })
      await queryClient.cancelQueries({ queryKey: ['feed'] })
      
      const previousPost = queryClient.getQueryData<Post>(['post', postId])
      
      if (previousPost) {
        queryClient.setQueryData<Post>(['post', postId], {
          ...previousPost,
          isSaved: false,
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
                post.id === postId ? { ...post, isSaved: false } : post
              ),
            })),
          }
        }
      )
      
      return { previousPost }
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'saved'] })
    },
  })
  
  return {
    save: saveMutation.mutate,
    unsave: unsaveMutation.mutate,
    isSaving: saveMutation.isPending || unsaveMutation.isPending,
  }
}
