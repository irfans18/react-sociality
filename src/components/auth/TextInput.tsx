import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white mb-4">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input-base w-full px-4 py-3 text-white placeholder:text-neutral-400',
            error && 'border-accent-red focus:ring-accent-red focus:border-accent-red',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-accent-red">{error}</p>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
