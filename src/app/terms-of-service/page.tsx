import { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - SBO Tech | Service Agreement & Legal Terms",
  description: "Read SBO Tech's terms of service for our Shopify app development services. Understand our service agreement, intellectual property rights, and legal terms.",
  keywords: [
    "SBO Tech terms of service",
    "service agreement",
    "legal terms",
    "Shopify development terms",
    "intellectual property",
    "service conditions"
  ],
  openGraph: {
    title: "Terms of Service - SBO Tech",
    description: "Read SBO Tech's terms of service for our Shopify app development services.",
    url: "https://sbotech.in/terms-of-service",
    siteName: "SBO Tech",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - SBO Tech",
    description: "Read SBO Tech's terms of service for our Shopify app development services.",
  },
  alternates: {
    canonical: "https://sbotech.in/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to SBO Tech. By accessing or using our services, you agree to be bound by these Terms of Service.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Services</h2>
      <p className="mb-4">
        Our Shopify app development and integration services are provided to help businesses grow and succeed online. You agree to use our services in compliance with all applicable laws and regulations.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All content, trademarks, and intellectual property on this site are owned by SBO Tech. You may not copy, reproduce, or distribute any content without our permission.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Limitation of Liability</h2>
      <p className="mb-4">
        SBO Tech is not liable for any damages resulting from the use or inability to use our services.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service at any time. Continued use of our services constitutes acceptance of the new terms.
      </p>
      <p className="mt-8">
        For questions, please <Link href="/#contact" className="underline">contact us</Link>.
      </p>
    </main>
  );
}