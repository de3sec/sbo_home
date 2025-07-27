import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverProjectApi } from '@/lib/server-api'
import { ProjectDetail } from '@/components/project-detail-new'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await serverProjectApi.getBySlug(params.slug)
    const project = response.data as any
    
    return {
      title: `${project.title} - Shopify App Development Project | SBO Tech`,
      description: project.description,
      keywords: [
        "Shopify app development",
        "e-commerce project",
        "custom Shopify solution",
        "Shopify integration",
        "e-commerce optimization",
        "digital commerce project",
        ...(project.technologies || [])
      ],
      openGraph: {
        title: project.title,
        description: project.description,
        type: 'website',
        url: `https://sbotech.in/work/${params.slug}`,
        siteName: "SBO Tech",
        images: [
          {
            url: project.image,
            width: 1200,
            height: 630,
            alt: `${project.title} - Shopify Development Project`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: [project.image],
      },
      alternates: {
        canonical: `https://sbotech.in/work/${params.slug}`,
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
  } catch (error) {
    return {
      title: 'Project - Shopify Development Portfolio | SBO Tech',
      description: 'Project not found',
    }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  try {
    const response = await serverProjectApi.getBySlug(params.slug)
    const project = response.data as any
    
    if (!project) {
      notFound()
    }
    
    return (
      <>
        {/* Schema.org structured data for the project */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "image": project.image,
              "creator": {
                "@type": "Organization",
                "name": "SBO Tech",
                "url": "https://sbotech.in"
              },
              "dateCreated": project.timeline,
              "url": `https://sbotech.in/work/${params.slug}`,
              "keywords": project.technologies?.join(", ") || "",
              "category": project.category,
              "audience": {
                "@type": "Audience",
                "audienceType": "E-commerce businesses"
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
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": project.title,
                    "item": `https://sbotech.in/work/${params.slug}`
                  }
                ]
              }
            })
          }}
        />
        <ProjectDetail project={project} />
      </>
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
} 