import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/api/endpoints'

export function useSearchUsers(q: string) {
  return useQuery({
    queryKey: ['search', 'users', q],
    queryFn: () => usersApi.searchUsers(q, 1, 20),
    enabled: q.length >= 1,
  })
}
