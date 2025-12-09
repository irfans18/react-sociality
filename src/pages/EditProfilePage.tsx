import { GradientButton } from '@/components/auth/GradientButton'
import { TextInput } from '@/components/auth/TextInput'
import { AvatarImage } from '@/components/common/Image'
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
import { profileEditSchema, type ProfileEditFormInput, type ProfileEditFormData } from '@/lib/validation/profileSchema'

export function EditProfilePage() {
  const navigate = useNavigate()
  const { data: profile, isLoading } = useMyProfile()
  const updateProfile = useUpdateProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const profileInitialized = useRef<number | null>(null)

  // Compute avatar preview: use selected file preview, otherwise use profile avatar
  const avatarPreview = avatarPreviewUrl || profile?.avatar || null

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ProfileEditFormInput>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: profile!.name,
      username: profile!.username,
      email: profile!.email,
      phone: profile!.phone,
      bio: profile?.bio || '',
    },
  })

  // Initialize form with fetched profile data
  // This is a legitimate use of useEffect to sync external data (API response) with component state
  useEffect(() => {
    console.log('profile', profile);
    if (profile && profile.id !== profileInitialized.current) {
      profileInitialized.current = profile.id
      reset({
        name: profile.name || '',
        username: profile.username || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
      }, {
        keepDefaultValues: false,
      })
    }
  }, [profile, reset])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChangePhoto = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (data: ProfileEditFormInput) => {
    setApiError(null)

    // Transform data (empty strings -> undefined)
    const transformedData: ProfileEditFormData = {
      name: data.name,
      username: data.username,
      email: data.email === '' ? undefined : data.email,
      phone: data.phone === '' ? undefined : data.phone,
      bio: data.bio === '' ? undefined : data.bio,
    }

    try {
      if (selectedFile) {
        // Upload with file
        const formDataToSend = new FormData()
        formDataToSend.append('avatar', selectedFile)
        formDataToSend.append('name', transformedData.name)
        formDataToSend.append('username', transformedData.username)
        if (transformedData.email) formDataToSend.append('email', transformedData.email)
        if (transformedData.phone) formDataToSend.append('phone', transformedData.phone)
        if (transformedData.bio) formDataToSend.append('bio', transformedData.bio)
        
        await updateProfile.mutateAsync(formDataToSend)
      } else {
        // Update without file
        await updateProfile.mutateAsync(transformedData)
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
            setError(key as keyof ProfileEditFormInput, {
              type: 'server',
              message: value[0],
            })
          } else if (typeof value === 'string') {
            setError(key as keyof ProfileEditFormInput, {
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
              <AvatarImage
                src={avatarPreview || profile.avatar}
                alt={profile.name}
                size="lg"
                className="w-32 h-32"
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
