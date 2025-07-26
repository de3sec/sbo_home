import { Metadata } from 'next'
import { AboutPage } from '@/components/about-page'

export const metadata: Metadata = {
  title: "About - SBO Tech",
  description: "Learn about SBO Tech, a leading Shopify app development agency dedicated to helping businesses thrive in the digital landscape.",
}

export default function About() {
  return <AboutPage />
} 