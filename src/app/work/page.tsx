import { Metadata } from 'next'
import { WorkPage } from '@/components/work-page-new'

export const metadata: Metadata = {
  title: "Our Portfolio - Shopify App Development Projects | SBO Tech",
  description: "Explore our comprehensive portfolio of innovative Shopify apps and e-commerce solutions. Custom product feeds, server-side tracking, performance optimization, and advanced e-commerce tools that drive results for businesses worldwide.",
  keywords: [
    "Shopify portfolio",
    "e-commerce projects",
    "Shopify app examples",
    "custom e-commerce solutions",
    "Shopify development case studies",
    "e-commerce optimization projects",
    "Shopify integration examples",
    "digital commerce portfolio"
  ],
  openGraph: {
    title: "Our Portfolio - Shopify App Development Projects | SBO Tech",
    description: "Explore our comprehensive portfolio of innovative Shopify apps and e-commerce solutions that drive results for businesses worldwide.",
    url: "https://sbotech.in/work",
    siteName: "SBO Tech",
    images: [
      {
        url: "/services-image.jpg",
        width: 1200,
        height: 630,
        alt: "SBO Tech Portfolio - Shopify App Development Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio - Shopify App Development Projects | SBO Tech",
    description: "Explore our comprehensive portfolio of innovative Shopify apps and e-commerce solutions that drive results for businesses worldwide.",
    images: ["/services-image.jpg"],
  },
  alternates: {
    canonical: "https://sbotech.in/work",
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

export default function Work() {
  return (
    <>
      {/* Schema.org structured data for the work/portfolio page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Our Portfolio - Shopify App Development Projects",
            "description": "Explore our comprehensive portfolio of innovative Shopify apps and e-commerce solutions that drive results for businesses worldwide.",
            "url": "https://sbotech.in/work",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Shopify Development Portfolio",
              "description": "Collection of Shopify app development projects and e-commerce solutions",
              "numberOfItems": "25+",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "CreativeWork",
                    "name": "Custom Shopify App Development",
                    "description": "Tailor-made Shopify applications for e-commerce optimization"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "CreativeWork",
                    "name": "E-commerce Performance Optimization",
                    "description": "Shopify store optimization for improved conversion rates"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "CreativeWork",
                    "name": "Shopify Integration Solutions",
                    "description": "Third-party integrations and API development for Shopify"
                  }
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
                  "name": "Our Work",
                  "item": "https://sbotech.in/work"
                }
              ]
            }
          })
        }}
      />
      <WorkPage />
    </>
  )
} 