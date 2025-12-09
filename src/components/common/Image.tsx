import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackSrc?: string
  skeletonClassName?: string
  showSkeleton?: boolean
  onError?: () => void
  onLoad?: () => void
}

/**
 * Reusable Image component with skeleton loading and error handling
 * 
 * Features:
 * - Skeleton loading state while image loads
 * - Automatic fallback to default image on error
 * - Smooth fade-in animation when image loads
 * - Customizable skeleton styling
 */
export function Image({
  src,
  alt,
  className = '',
  fallbackSrc = '/default-avatar.png',
  skeletonClassName = '',
  showSkeleton = true,
  onError,
  onLoad,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc)

  // Reset state when src changes
  useEffect(() => {
    if (src) {
      setImageSrc(src)
      setIsLoading(true)
      setHasError(false)
    } else {
      setImageSrc(fallbackSrc)
      setIsLoading(false)
      setHasError(false)
    }
  }, [src, fallbackSrc])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    if (imageSrc !== fallbackSrc) {
      // Try fallback
      setImageSrc(fallbackSrc)
      setHasError(false)
    } else {
      // Already on fallback, show error state
      setHasError(true)
      onError?.()
    }
  }

  // Default skeleton classes
  const defaultSkeletonClass = 'bg-neutral-800 animate-pulse'
  const skeletonClass = skeletonClassName || defaultSkeletonClass

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Loading State */}
      {showSkeleton && isLoading && !hasError && (
        <div className={`absolute inset-0 ${skeletonClass} flex items-center justify-center overflow-hidden`}>
          <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {hasError ? (
        <div className={`w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-500 text-xs overflow-hidden ${className}`}>
          <div className="text-center px-2">
            <div className="mb-1">⚠️</div>
            <div className="truncate">Image unavailable</div>
          </div>
        </div>
      ) : (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 object-cover`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  )
}

/**
 * Avatar Image component - specialized for user avatars
 */
interface AvatarImageProps {
  src: string | null | undefined
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackSrc?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-20 h-20',
  xl: 'w-36 h-36',
}

export function AvatarImage({
  src,
  alt,
  size = 'md',
  className = '',
  fallbackSrc = '/default-avatar.png',
}: AvatarImageProps) {
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fallbackSrc={fallbackSrc}
        className="w-full h-full rounded-full object-cover border border-neutral-700"
        skeletonClassName="bg-neutral-800 rounded-full"
        showSkeleton={true}
      />
    </div>
  )
}

/**
 * Post Image component - specialized for post images
 */
interface PostImageProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
}

export function PostImageComponent({
  src,
  alt = 'Post image',
  className = '',
  onLoad,
}: PostImageProps) {
  return (
    <div className={`relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-900 ${className}`}>
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        skeletonClassName="bg-neutral-800"
        showSkeleton={true}
        onLoad={onLoad}
      />
    </div>
  )
}
