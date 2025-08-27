import { Metadata } from 'next'
import { AboutPage } from '@/components/about-page'

export const metadata: Metadata = {
  title: "About SBO Tech - Leading Shopify App Development Agency | Custom E-commerce Solutions",
  description: "Discover SBO Tech, a premier Shopify app development agency serving US, Europe, and Australia. Learn about our expertise in custom e-commerce solutions, performance optimization, and digital commerce innovation.",
  keywords: [
    "SBO Tech about",
    "Shopify development agency",
    "e-commerce experts",
    "custom Shopify solutions",
    "digital commerce agency",
    "Shopify app developers",
    "e-commerce optimization experts",
    "Shopify integration specialists"
  ],
  openGraph: {
    title: "About SBO Tech - Leading Shopify App Development Agency",
    description: "Discover SBO Tech, a premier Shopify app development agency serving US, Europe, and Australia with custom e-commerce solutions.",
    url: "https://sbotech.in/about",
    siteName: "SBO Tech",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "About SBO Tech - Shopify App Development Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SBO Tech - Leading Shopify App Development Agency",
    description: "Discover SBO Tech, a premier Shopify app development agency serving US, Europe, and Australia with custom e-commerce solutions.",
    images: ["/hero-image.png"],
  },
  alternates: {
    canonical: "https://sbotech.in/about",
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
};

export default function About() {
  return (
    <>
      {/* Schema.org structured data for the about page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About SBO Tech",
            "description": "SBO Tech is a premier Shopify app development agency specializing in custom e-commerce solutions, performance optimization, and seamless integrations.",
            "url": "https://sbotech.in/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "SBO Tech",
              "description": "Premier Shopify app development agency specializing in custom e-commerce solutions",
              "foundingDate": "2020",
              "url": "https://sbotech.in",
              "logo": "https://sbotech.in/SBO_Logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://sbotech.in/contact"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "serviceArea": [
                {
                  "@type": "Country",
                  "name": "United States"
                },
                {
                  "@type": "Country",
                  "name": "United Kingdom"
                },
                {
                  "@type": "Country",
                  "name": "Germany"
                },
                {
                  "@type": "Country",
                  "name": "France"
                },
                {
                  "@type": "Country",
                  "name": "Australia"
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://sbotech.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://sbotech.in/about"
                }
              ]
            }
          })
        }}
      />
      <AboutPage />
    </>
  )
} 