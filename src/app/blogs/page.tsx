import { Metadata } from 'next'
import { BlogsPage } from '@/components/blogs-page-new'

export const metadata: Metadata = {
  title: "Blogs - SBO Tech",
  description: "Latest insights, tutorials, and updates from SBO Tech's Shopify development experts.",
}

export default function Blogs() {
  return <BlogsPage />
} 