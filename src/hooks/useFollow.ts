import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followApi } from '@/api/endpoints'
import type { Profile } from '@/types'

export function useFollow(username: string) {
  const queryClient = useQueryClient()
  
  const followMutation = useMutation({
    mutationFn: () => followApi.follow(username),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user', username] })
      
      const previousProfile = queryClient.getQueryData<Profile>(['user', username])
      
      if (previousProfile) {
        queryClient.setQueryData<Profile>(['user', username], {
          ...previousProfile,
          isFollowedByMe: true,
          followersCount: previousProfile.followersCount + 1,
        })
      }
      
      return { previousProfile }
    },
    onError: (err, variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(['user', username], context.previousProfile)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] })
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
  
  const unfollowMutation = useMutation({
    mutationFn: () => followApi.unfollow(username),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user', username] })
      
      const previousProfile = queryClient.getQueryData<Profile>(['user', username])
      
      if (previousProfile) {
        queryClient.setQueryData<Profile>(['user', username], {
          ...previousProfile,
          isFollowedByMe: false,
          followersCount: Math.max(0, previousProfile.followersCount - 1),
        })
      }
      
      return { previousProfile }
    },
    onError: (err, variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(['user', username], context.previousProfile)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] })
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
  
  return {
    follow: followMutation.mutate,
    unfollow: unfollowMutation.mutate,
    isFollowing: followMutation.isPending || unfollowMutation.isPending,
  }
}
