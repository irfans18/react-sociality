import { z } from 'zod'

// Profile edit form schema
export const profileEditSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .trim(),
  email: z
    .string()
    .refine((val) => val === '' || z.string().email().safeParse(val).success, {
      message: 'Please enter a valid email address',
    })
    .or(z.literal('')),
  phone: z.string().or(z.literal('')),
  bio: z.string().or(z.literal('')),
})

// Form input type (what react-hook-form uses)
export type ProfileEditFormInput = z.infer<typeof profileEditSchema>

// API submission type (with empty strings transformed to undefined)
export type ProfileEditFormData = {
  name: string
  username: string
  email?: string
  phone?: string
  bio?: string
}
