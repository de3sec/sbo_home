import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert relative image URLs to absolute URLs for Next.js Image optimization
 * This is required for API route images to work with Next.js Image component
 */
export function getAbsoluteImageUrl(url: string): string {
  // If already absolute, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // Get the base URL
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://sbotech.in' 
    : 'http://localhost:3000'
  
  // Ensure URL starts with /
  const cleanUrl = url.startsWith('/') ? url : `/${url}`
  
  return `${baseUrl}${cleanUrl}`
}
