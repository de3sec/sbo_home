import { Metadata } from 'next'
import { BlogsPage } from '@/components/blogs-page-new'

export const metadata: Metadata = {
  title: "Shopify Development Blog - Expert Insights & E-commerce Tutorials | SBO Tech",
  description: "Stay ahead with our comprehensive Shopify development blog featuring expert insights, tutorials, case studies, and industry trends. Learn about custom app development, performance optimization, and e-commerce best practices.",
  keywords: [
    "Shopify development blog",
    "e-commerce tutorials",
    "Shopify app development",
    "e-commerce insights",
    "Shopify performance optimization",
    "custom Shopify apps",
    "e-commerce best practices",
    "Shopify development tips",
    "e-commerce case studies",
    "Shopify Plus development"
  ],
  authors: [{ name: "SBO Tech Team" }],
  creator: "SBO Tech",
  publisher: "SBO Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sbotech.in'),
  alternates: {
    canonical: 'https://sbotech.in/blogs',
  },
  openGraph: {
    title: "Shopify Development Blog - Expert Insights & E-commerce Tutorials",
    description: "Get the latest insights on Shopify development, app updates, and industry trends. Expert tutorials and case studies to help you optimize your e-commerce business.",
    url: 'https://sbotech.in/blogs',
    siteName: 'SBO Tech',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SBO Tech Shopify Development Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Development Blog - Expert Insights & E-commerce Tutorials',
    description: 'Get the latest insights on Shopify development and e-commerce optimization.',
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
};

export default function Blogs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "SBO Tech Shopify Development Blog",
            "description": "Expert insights, tutorials, and case studies on Shopify development and e-commerce optimization",
            "url": "https://sbotech.in/blogs",
            "publisher": {
              "@type": "Organization",
              "name": "SBO Tech",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sbotech.in/SBO_Logo.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://sbotech.in/blogs"
            },
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "Shopify App Development Best Practices",
                "description": "Learn the essential best practices for developing custom Shopify apps that drive business results",
                "author": {
                  "@type": "Person",
                  "name": "SBO Tech Team"
                },
                "datePublished": "2024-01-01",
                "dateModified": "2024-01-01",
                "publisher": {
                  "@type": "Organization",
                  "name": "SBO Tech"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://sbotech.in/blogs/shopify-app-development-best-practices"
                }
              },
              {
                "@type": "BlogPosting",
                "headline": "E-commerce Performance Optimization Guide",
                "description": "Comprehensive guide to optimizing your Shopify store for speed, SEO, and conversion rates",
                "author": {
                  "@type": "Person",
                  "name": "SBO Tech Team"
                },
                "datePublished": "2024-01-01",
                "dateModified": "2024-01-01",
                "publisher": {
                  "@type": "Organization",
                  "name": "SBO Tech"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://sbotech.in/blogs/ecommerce-performance-optimization"
                }
              }
            ]
          })
        }}
      />
      <BlogsPage />
    </>
  )
} 