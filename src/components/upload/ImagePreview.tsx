import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImagePreviewProps {
  file: File | string
  onRemove: () => void
}

export function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-900"
    >
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-full object-cover"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
      >
        <X size={20} />
      </button>
    </motion.div>
  )
}
