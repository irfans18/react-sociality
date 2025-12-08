import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface PostImageProps {
  image: string
  alt?: string
}

export function PostImage({ image, alt = 'Post image' }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-neutral-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
        </div>
      )}
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center text-neutral-500">
          Failed to load image
        </div>
      ) : (
        <img
          src={image}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
