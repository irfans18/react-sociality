import { GradientButton } from '@/components/auth/GradientButton'
import { TextInput } from '@/components/auth/TextInput'
import { BottomNav } from '@/components/navigation/BottomNav'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { useMyProfile, useUpdateProfile } from '@/hooks/useProfile'
import { pageVariants } from '@/motion/page'
import type { ApiError } from '@/types'
import type { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

// Zod schema for profile edit form
const profileEditSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  phone: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)),
  bio: z.string().optional().or(z.literal('')).transform((val) => (val === '' ? undefined : val)),
})

type ProfileEditFormData = z.infer<typeof profileEditSchema>

export function EditProfilePage() {
  const navigate = useNavigate()
  const { data: profile, isLoading } = useMyProfile()
  const updateProfile = useUpdateProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      bio: '',
    },
  })

  // Initialize form when profile loads
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        username: profile.username || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
      })
      setAvatarPreview(profile.avatar || null)
    }
  }, [profile, reset])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChangePhoto = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (data: ProfileEditFormData) => {
    setApiError(null)

    try {
      if (selectedFile) {
        // Upload with file
        const formDataToSend = new FormData()
        formDataToSend.append('avatar', selectedFile)
        formDataToSend.append('name', data.name)
        formDataToSend.append('username', data.username)
        if (data.email) formDataToSend.append('email', data.email)
        if (data.phone) formDataToSend.append('phone', data.phone)
        if (data.bio) formDataToSend.append('bio', data.bio)
        
        await updateProfile.mutateAsync(formDataToSend)
      } else {
        // Update without file
        const updateData: {
          name: string
          username: string
          email?: string
          phone?: string
          bio?: string
        } = {
          name: data.name,
          username: data.username,
        }
        
        if (data.email) {
          updateData.email = data.email
        }
        if (data.phone) {
          updateData.phone = data.phone
        }
        if (data.bio) {
          updateData.bio = data.bio
        }
        
        await updateProfile.mutateAsync(updateData)
      }
      
      // Navigate back to profile on success
      navigate('/me')
    } catch (error) {
      // Handle API errors
      const axiosError = error as AxiosError<ApiError>
      const errorMessage = axiosError?.response?.data?.message || axiosError?.message || 'Failed to update profile'
      const errorFields = axiosError?.response?.data?.errors || {}
      
      // Set field-specific errors if provided
      if (errorFields && typeof errorFields === 'object') {
        Object.entries(errorFields).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            setError(key as keyof ProfileEditFormData, {
              type: 'server',
              message: value[0],
            })
          } else if (typeof value === 'string') {
            setError(key as keyof ProfileEditFormData, {
              type: 'server',
              message: value,
            })
          }
        })
      } else {
        // Set general error
        setApiError(errorMessage)
      }
    }
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-400">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-neutral-950 pb-20 md:pb-6"
    >
      <TopNavBar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/me')}
            className="text-white hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Avatar */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative mb-4">
              <img
                src={avatarPreview || profile.avatar || '/default-avatar.png'}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={handleChangePhoto}
              className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-input font-medium hover:bg-neutral-800 transition-colors"
            >
              Change Photo
            </button>
          </div>

          {/* Right Column - Form Fields */}
          <div className="flex-1 space-y-6">
            <TextInput
              label="Name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Enter your name"
            />
            
            <TextInput
              label="Username"
              {...register('username')}
              error={errors.username?.message}
              placeholder="Enter your username"
            />
            
            <TextInput
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="Enter your email"
            />
            
            <TextInput
              label="Number Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="Enter your phone number"
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-4">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                className="input-base w-full px-4 py-3 text-white placeholder:text-neutral-400 resize-none"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-accent-red">{errors.bio.message}</p>
              )}
            </div>

            {apiError && (
              <div className="p-3 bg-accent-red/10 border border-accent-red rounded-input">
                <p className="text-sm text-accent-red">{apiError}</p>
              </div>
            )}

            <div className="pt-4">
              <GradientButton type="submit" isLoading={isSubmitting || updateProfile.isPending}>
                Save Changes
              </GradientButton>
            </div>
          </div>
        </form>
      </main>
      
      <BottomNav />
    </motion.div>
  )
}
