import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchUsers } from '@/hooks/useSearchUsers'
import { SearchResultItem } from './SearchResultItem'
import { dropdownVariants } from '@/motion/search'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const { data: searchData, isLoading, isDebouncing } = useSearchUsers(query, 150)

  const users = searchData?.data || []
  const hasResults = users.length > 0
  const showDropdown = isOpen && query.length >= 1
  const showLoading = isLoading || isDebouncing

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsOpen(true)
  }

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    if (query.length >= 1) {
      setIsOpen(true)
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search"
          className="w-full pl-10 pr-10 py-2 bg-neutral-900 border border-neutral-700 rounded-input text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-transparent"
        />
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-card shadow-card overflow-hidden z-50"
          >
            {showLoading ? (
              <div className="px-4 py-8 text-center text-neutral-400 text-sm">Searching...</div>
            ) : hasResults ? (
              <div className="max-h-96 overflow-y-auto">
                {users.map((user, index) => (
                  <SearchResultItem key={`${user.id}-${index}`} user={user} onClick={handleResultClick} />
                ))}
              </div>
            ) : (
              <div className="px-4 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center flex-shrink-0">
                    <Search className="text-neutral-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm mb-1">No results found</p>
                    <p className="text-xs text-neutral-400">Change your keyword</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
