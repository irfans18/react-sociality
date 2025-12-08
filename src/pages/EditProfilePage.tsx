import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import type { AxiosError } from 'axios'
import { pageVariants } from '@/motion/page'
import { useMyProfile, useUpdateProfile } from '@/hooks/useProfile'
import { TopNavBar } from '@/components/navigation/TopNavBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { GradientButton } from '@/components/auth/GradientButton'
import { TextInput } from '@/components/auth/TextInput'
import type { ApiError } from '@/types'

export function EditProfilePage() {
  const navigate = useNavigate()
  const { data: profile, isLoading } = useMyProfile()
  const updateProfile = useUpdateProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize form data from profile
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
  })
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const initializedProfileId = useRef<number | null>(null)

  // Initialize form data when profile loads (only once per profile ID)
  useEffect(() => {
    if (profile && profile.id !== initializedProfileId.current && !selectedFile) {
      initializedProfileId.current = profile.id
      setFormData({
        name: profile.name || '',
        username: profile.username || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
      })
      if (!avatarPreview) {
        setAvatarPreview(profile.avatar || null)
      }
    }
    // Note: We intentionally don't include all dependencies to prevent re-initialization
    // when user is editing the form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, selectedFile])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }))
      return
    }

    if (!formData.username.trim()) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }))
      return
    }

    // Username validation (alphanumeric and underscores)
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setErrors(prev => ({ ...prev, username: 'Username can only contain letters, numbers, and underscores' }))
      return
    }

    // Email validation (if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      return
    }

    try {
      if (selectedFile) {
        // Upload with file
        const formDataToSend = new FormData()
        formDataToSend.append('avatar', selectedFile)
        formDataToSend.append('name', formData.name.trim())
        formDataToSend.append('username', formData.username.trim())
        if (formData.email?.trim()) formDataToSend.append('email', formData.email.trim())
        if (formData.phone?.trim()) formDataToSend.append('phone', formData.phone.trim())
        if (formData.bio?.trim()) formDataToSend.append('bio', formData.bio.trim())
        
        await updateProfile.mutateAsync(formDataToSend)
      } else {
        // Update without file - only send changed fields or all fields
        const updateData: {
          name: string
          username: string
          email?: string
          phone?: string
          bio?: string
        } = {
          name: formData.name.trim(),
          username: formData.username.trim(),
        }
        
        if (formData.email?.trim()) {
          updateData.email = formData.email.trim()
        }
        if (formData.phone?.trim()) {
          updateData.phone = formData.phone.trim()
        }
        if (formData.bio?.trim()) {
          updateData.bio = formData.bio.trim()
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
      
      // Convert errors object from Record<string, string[]> to Record<string, string>
      const formattedErrors: Record<string, string> = {}
      if (errorFields && typeof errorFields === 'object') {
        Object.entries(errorFields).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            formattedErrors[key] = value[0]
          } else if (typeof value === 'string') {
            formattedErrors[key] = value
          }
        })
      }
      
      // Set field-specific errors if provided
      if (Object.keys(formattedErrors).length > 0) {
        setErrors(formattedErrors)
      } else {
        // Set general error
        setErrors({ _general: errorMessage })
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

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
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
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter your name"
            />
            
            <TextInput
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              error={errors.username}
              placeholder="Enter your username"
            />
            
            <TextInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email"
            />
            
            <TextInput
              label="Number Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              placeholder="Enter your phone number"
            />
            
            <div className="w-full">
              <label className="block text-sm font-medium text-white mb-4">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="input-base w-full px-4 py-3 text-white placeholder:text-neutral-400 resize-none"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-accent-red">{errors.bio}</p>
              )}
            </div>

            {errors._general && (
              <div className="p-3 bg-accent-red/10 border border-accent-red rounded-input">
                <p className="text-sm text-accent-red">{errors._general}</p>
              </div>
            )}

            <div className="pt-4">
              <GradientButton type="submit" isLoading={updateProfile.isPending}>
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
