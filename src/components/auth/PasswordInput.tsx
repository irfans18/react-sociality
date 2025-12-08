import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { TextInput } from './TextInput'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends Omit<React.ComponentProps<typeof TextInput>, 'type'> {
  label: string
  error?: string
  placeholder?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative w-full">
        <TextInput
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-12', className)}
          label={label}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer right-3 text-white hover:text-neutral-200 transition-colors"
          style={{ 
            top: label ? 'calc(1.5rem + 1rem + 1.5rem)' : '1.5rem',
            transform: 'translateY(-50%)'
          }}
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
