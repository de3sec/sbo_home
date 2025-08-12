import { Metadata } from 'next'
import { HomePage } from "@/components/home-page";
import { BackgroundCellAnimation } from "@/components/ui/BackgroundRippleEffect";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SBO Tech - Leading Shopify App Development Agency | Custom E-commerce Solutions",
  description: "Transform your Shopify store with SBO Tech's expert app development services. Custom Shopify apps, performance optimization, and seamless integrations that drive 25% higher conversion rates. Serving US, Europe, and Australia.",
  keywords: [
    "Shopify app development",
    "custom Shopify apps",
    "e-commerce optimization",
    "Shopify integration",
    "Shopify agency",
    "e-commerce solutions",
    "Shopify performance",
    "digital commerce",
    "online store development"
  ],
  openGraph: {
    title: "SBO Tech - Leading Shopify App Development Agency",
    description: "Transform your Shopify store with expert app development services. Custom solutions that drive 25% higher conversion rates.",
    url: "https://sbotech.in",
    siteName: "SBO Tech",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "SBO Tech Shopify App Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SBO Tech - Leading Shopify App Development Agency",
    description: "Transform your Shopify store with expert app development services. Custom solutions that drive 25% higher conversion rates.",
    images: ["/hero-image.jpg"],
  },
  alternates: {
    canonical: "https://sbotech.in",
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

export default function Home() {
  return (
    <>
      {/* Schema.org structured data for the home page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SBO Tech - Leading Shopify App Development Agency",
            "description": "Transform your Shopify store with SBO Tech's expert app development services. Custom Shopify apps, performance optimization, and seamless integrations that drive 25% higher conversion rates.",
            "url": "https://sbotech.in",
            "mainEntity": {
              "@type": "Service",
              "name": "Shopify App Development",
              "description": "Custom Shopify app development services including performance optimization, integration, and e-commerce solutions",
              "provider": {
                "@type": "Organization",
                "name": "SBO Tech"
              },
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
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Shopify Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Shopify App Development",
                      "description": "Tailor-made Shopify apps to streamline your business operations"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Shopify Integration Services",
                      "description": "Seamlessly integrate your Shopify store with third-party tools and services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Performance Optimization",
                      "description": "Improve your Shopify store's speed, reliability, and user experience"
                    }
                  }
                ]
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://sbotech.in"
                }
              ]
            }
          })
        }}
      />
      
    <div className="w-full h-full">
      <HomePage></HomePage>
    </div>
    </>
  );
}
