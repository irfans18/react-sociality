import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { AuthCard } from '@/components/auth/AuthCard'
import { TextInput } from '@/components/auth/TextInput'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { GradientButton } from '@/components/auth/GradientButton'
import { useRegister } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const register = useRegister()

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    if (!formData.name) {
      setErrors({ name: 'Name is required' })
      return
    }
    if (!formData.username) {
      setErrors({ username: 'Username is required' })
      return
    }
    if (!formData.email) {
      setErrors({ email: 'Email is required' })
      return
    }
    if (!formData.password || formData.password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' })
      return
    }

    register.mutate(
      {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
      },
      {
        onSuccess: () => {
          navigate('/feed')
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message || 'Registration failed'
          const fieldErrors = error?.response?.data?.errors || {}
          setErrors({ ...fieldErrors, _general: message })
        },
      }
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4 bg-neutral-950"
    >
      <AuthCard>
        <h1 className="text-2xl font-bold text-neutral-50 mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={errors.name}
            placeholder="John Doe"
          />
          <TextInput
            label="Username"
            value={formData.username}
            onChange={handleChange('username')}
            error={errors.username}
            placeholder="johndoe"
          />
          <TextInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="john@email.com"
          />
          <TextInput
            label="Phone (Optional)"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
            placeholder="081234567890"
          />
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            placeholder="At least 6 characters"
          />
          {errors._general && (
            <p className="text-sm text-accent-red">{errors._general}</p>
          )}
          <GradientButton type="submit" isLoading={register.isPending}>
            Register
          </GradientButton>
        </form>
        <p className="mt-6 text-center text-neutral-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-200 hover:text-primary-300">
            Login
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  )
}
