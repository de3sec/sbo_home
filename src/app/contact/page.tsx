import { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'

export const metadata: Metadata = {
  title: "Contact SBO Tech - Shopify App Development Experts | Get Your Free Quote",
  description: "Contact SBO Tech for expert Shopify app development services. Get your free quote for custom e-commerce solutions, performance optimization, and integration services. Serving US, Europe, and Australia.",
  keywords: [
    "contact SBO Tech",
    "Shopify development quote",
    "e-commerce consultation",
    "Shopify app development contact",
    "custom e-commerce solutions",
    "Shopify integration services",
    "digital commerce experts",
    "Shopify development consultation"
  ],
  openGraph: {
    title: "Contact SBO Tech - Shopify App Development Experts",
    description: "Contact SBO Tech for expert Shopify app development services. Get your free quote for custom e-commerce solutions.",
    url: "https://sbotech.in/contact",
    siteName: "SBO Tech",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact SBO Tech - Shopify App Development Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SBO Tech - Shopify App Development Experts",
    description: "Contact SBO Tech for expert Shopify app development services. Get your free quote for custom e-commerce solutions.",
    images: ["/hero-image.jpg"],
  },
  alternates: {
    canonical: "https://sbotech.in/contact",
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

export default function ContactPageRoute() {
  return (
    <>
      {/* Schema.org structured data for the contact page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact SBO Tech",
            "description": "Get in touch with SBO Tech for expert Shopify app development services and custom e-commerce solutions.",
            "url": "https://sbotech.in/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "SBO Tech",
              "url": "https://sbotech.in",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "https://sbotech.in/contact",
                  "availableLanguage": ["English"],
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
                  "name": "Contact",
                  "item": "https://sbotech.in/contact"
                }
              ]
            }
          })
        }}
      />
      <ContactPage />
    </>
  )
} 