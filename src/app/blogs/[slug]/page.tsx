import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverBlogApi } from '@/lib/server-api'
import { BlogPost } from '@/components/blog-post-new'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await serverBlogApi.getBySlug(params.slug)
    const post = response.data as any
    
    return {
      title: `${post.title} - Shopify Development Blog | SBO Tech`,
      description: post.excerpt,
      keywords: [
        "Shopify development",
        "e-commerce optimization",
        "Shopify app development",
        "digital commerce",
        "e-commerce tutorials",
        ...(post.tags || [])
      ],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        url: `https://sbotech.in/blogs/${params.slug}`,
        siteName: "SBO Tech",
        images: [
          {
            url: post.image || "https://sbotech.in/SBO_Logo.svg",
            width: 1200,
            height: 630,
            alt: `${post.title} - Shopify Development Article`,
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
      alternates: {
        canonical: `https://sbotech.in/blogs/${params.slug}`,
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
      title: 'Blog Post - Shopify Development Blog | SBO Tech',
      description: 'Blog post not found',
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const response = await serverBlogApi.getBySlug(params.slug)
    const post = response.data as any
    
    if (!post || post.status !== 'published') {
      notFound()
    }
    
    return (
      <>
        {/* Schema.org structured data for the blog post */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.image,
              "author": {
                "@type": "Person",
                "name": post.author.name,
                "jobTitle": post.author.role,
                "description": post.author.bio
              },
              "publisher": {
                "@type": "Organization",
                "name": "SBO Tech",
                "url": "https://sbotech.in",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sbotech.in/SBO_Logo.svg"
                }
              },
              "datePublished": post.publishedAt,
              "dateModified": post.publishedAt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://sbotech.in/blogs/${params.slug}`
              },
              "url": `https://sbotech.in/blogs/${params.slug}`,
              "wordCount": post.content?.length || 0,
              "articleSection": post.category,
              "keywords": post.tags?.join(", ") || "",
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
                    "name": "Blog",
                    "item": "https://sbotech.in/blogs"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.title,
                    "item": `https://sbotech.in/blogs/${params.slug}`
                  }
                ]
              }
            })
          }}
        />
        <BlogPost post={post} />
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
} 