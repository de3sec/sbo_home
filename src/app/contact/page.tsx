import { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'

export const metadata: Metadata = {
  title: "Contact Us - SBO Tech",
  description: "Get in touch with SBO Tech for your Shopify development needs.",
}

export default function ContactPageRoute() {
  return <ContactPage />
} 