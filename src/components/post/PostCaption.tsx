import { useState } from 'react'

interface PostCaptionProps {
  caption?: string
  authorUsername?: string
}

const MAX_LENGTH = 150

export function PostCaption({ caption, authorUsername }: PostCaptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!caption) return null

  const shouldTruncate = caption.length > MAX_LENGTH
  const displayText = shouldTruncate && !isExpanded
    ? `${caption.slice(0, MAX_LENGTH)}...`
    : caption

  return (
    <div className="text-neutral-200">
      {authorUsername && (
        <span className="font-semibold mr-2">@{authorUsername}</span>
      )}
      <span>{displayText}</span>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-neutral-400 hover:text-neutral-200 text-sm font-medium"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
