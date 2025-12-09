import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { usersApi } from '@/api/endpoints'

/**
 * Custom hook for searching users with debouncing
 * @param query - Search query string
 * @param debounceMs - Debounce delay in milliseconds (default: 200ms for faster response)
 */
export function useSearchUsers(query: string, debounceMs = 200) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs])

  // Only search if query has at least 1 character
  const shouldSearch = debouncedQuery.trim().length >= 1

  const result = useQuery({
    queryKey: ['search', 'users', debouncedQuery.trim()],
    queryFn: () => usersApi.searchUsers(debouncedQuery.trim(), 1, 20),
    enabled: shouldSearch,
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // Always refetch when component mounts
  })

  return {
    ...result,
    query: debouncedQuery,
    isDebouncing: query !== debouncedQuery,
  }
}