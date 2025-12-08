import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: string
  className?: string
}

export function UploadDropzone({ onFileSelect, accept = 'image/*', className }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  return (
    <motion.div
      animate={isDragging ? { scale: 1.02, borderColor: '#7F51F9' } : { scale: 1 }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'border-2 border-dashed border-neutral-600 rounded-lg p-12 text-center cursor-pointer transition-colors',
        isDragging && 'border-primary-200 bg-primary-200/10',
        className
      )}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
        <p className="text-neutral-400 mb-2">
          Drag and drop an image here, or click to select
        </p>
        <p className="text-sm text-neutral-500">
          PNG, JPG, WEBP up to 5MB
        </p>
      </label>
    </motion.div>
  )
}
