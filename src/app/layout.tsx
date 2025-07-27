import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'
import FormbricksProvider from "./formbricks";
import { Suspense } from 'react'
import { Providers } from '@/components/providers/Providers'
import { CookieConsent } from '@/components/cookie-consent'

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sbotech.in'),
  title: {
    default: "SBO Tech - Leading Shopify App Development Agency | Custom E-commerce Solutions",
    template: "%s | SBO Tech"
  },
  description: "SBO Tech is a premier Shopify app development agency specializing in custom e-commerce solutions, performance optimization, and seamless integrations. Serving US, Europe, and Australia with innovative Shopify apps and themes.",
  keywords: [
    "Shopify app development",
    "e-commerce solutions",
    "custom Shopify apps",
    "Shopify integration",
    "e-commerce optimization",
    "Shopify themes",
    "digital commerce",
    "online store development",
    "Shopify agency",
    "e-commerce consulting"
  ],
  authors: [{ name: "SBO Tech Team" }],
  creator: "SBO Tech",
  publisher: "SBO Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sbotech.in',
    siteName: 'SBO Tech',
    title: 'SBO Tech - Leading Shopify App Development Agency',
    description: 'Premier Shopify app development agency specializing in custom e-commerce solutions, performance optimization, and seamless integrations.',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SBO Tech - Shopify App Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBO Tech - Leading Shopify App Development Agency',
    description: 'Premier Shopify app development agency specializing in custom e-commerce solutions and performance optimization.',
    images: ['/hero-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://sbotech.in',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SBO Tech",
              "url": "https://sbotech.in",
              "logo": "https://sbotech.in/SBO_Logo.svg",
              "description": "Premier Shopify app development agency specializing in custom e-commerce solutions, performance optimization, and seamless integrations.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://sbotech.in/contact"
              },
              "sameAs": [
                "https://linkedin.com/company/sbo-tech",
                "https://twitter.com/sbotech"
              ],
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
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Shopify Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Shopify App Development"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Shopify Integration Services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Performance Optimization"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Local Business Schema for different regions */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "SBO Tech",
              "description": "Shopify app development agency serving global markets",
              "url": "https://sbotech.in",
              "email": "hello@sbotech.in",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.644800",
                "longitude": "77.216721"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$",
              "currenciesAccepted": "USD, EUR, AUD",
              "paymentAccepted": "Credit Card, Bank Transfer",
              "areaServed": [
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
            })
          }}
        />
      </head>
      {/* <Suspense>
        <FormbricksProvider />
      </Suspense> */}
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
