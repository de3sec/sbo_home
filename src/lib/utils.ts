import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSupabaseImageUrl } from './supabase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAbsoluteImageUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // For Supabase storage URLs, use the helper function
  return getSupabaseImageUrl(url)
}
