import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function GradientButton({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'w-full py-3 px-6 rounded-pill font-medium text-white transition-all',
        variant === 'primary'
          ? 'bg-primary-200 hover:bg-primary-300 shadow-glow'
          : 'bg-neutral-800 hover:bg-neutral-700',
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
