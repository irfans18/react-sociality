import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '@/motion/page'
import { AuthCard } from '@/components/auth/AuthCard'
import { TextInput } from '@/components/auth/TextInput'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { GradientButton } from '@/components/auth/GradientButton'
import { useLogin } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import logo from '/assets/logo.png'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const login = useLogin()

  const returnTo = searchParams.get('returnTo') || '/feed'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!email) {
      setErrors({ email: 'Email is required' })
      return
    }
    if (!password) {
      setErrors({ password: 'Password is required' })
      return
    }

    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(returnTo)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const message = error?.response?.data?.message || 'Login failed'
          setErrors({ email: message })
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
      className="min-h-screen flex items-center justify-center p-4 auth-page-bg relative overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary-200/8 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s', animationTimingFunction: 'ease-in-out' }} />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary-300/10 rounded-full blur-[120px] animate-pulse"
             style={{ animationDuration: '10s', animationTimingFunction: 'ease-in-out', animationDelay: '1s' }} />
      </div>

      <AuthCard className="relative z-10">
        {/* Logo and Branding */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="Sociality" className="w-8 h-8" />
          <span className="text-2xl font-bold text-white">Sociality</span>
        </div>

        {/* Welcome Heading */}
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back!</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
          />

          <div className="mt-8">
            <GradientButton type="submit" isLoading={login.isPending}>
              Login
            </GradientButton>
          </div>
        </form>

        <p className="mt-8 text-center text-white text-sm">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-primary-200 hover:text-primary-300 underline"
          >
            Register
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  )
}
