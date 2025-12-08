import { useInfiniteQuery } from '@tanstack/react-query'
import { feedApi } from '@/api/endpoints'
import type { Post } from '@/types'

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => feedApi.getFeed(pageParam, 20),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
}
