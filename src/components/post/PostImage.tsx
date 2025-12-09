import { PostImageComponent } from '@/components/common/Image'

interface PostImageProps {
  image: string
  alt?: string
}

export function PostImage({ image, alt = 'Post image' }: PostImageProps) {
  return <PostImageComponent src={image} alt={alt} className="mb-4" />
}
