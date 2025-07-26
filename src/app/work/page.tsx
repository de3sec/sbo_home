import { Metadata } from 'next'
import { WorkPage } from '@/components/work-page-new'

export const metadata: Metadata = {
  title: "Our Work - SBO Tech",
  description: "Explore our portfolio of innovative Shopify apps and solutions including custom product feeds, server-side tracking, and advanced e-commerce tools.",
}

export default function Work() {
  return <WorkPage />
} 