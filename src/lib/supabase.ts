import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket name
export const STORAGE_BUCKET = 'sbo-images'

// Helper function to get public URL for images
export function getSupabaseImageUrl(path: string): string {
  if (!path) return ''
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // If it's a Supabase storage path, construct the URL
  if (path.startsWith(`${STORAGE_BUCKET}/`)) {
    return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path.replace(`${STORAGE_BUCKET}/`, '')}`
  }
  
  // For legacy paths, assume it's a Supabase path
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`
} 