import { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CaptionFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function CaptionField({ label, className, ...props }: CaptionFieldProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'input-base w-full px-4 py-3 text-neutral-50 placeholder:text-neutral-500 resize-none',
          className
        )}
        rows={4}
        {...props}
      />
    </div>
  )
}
