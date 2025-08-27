import { MetadataRoute } from 'next'
import { serverBlogApi, serverProjectApi } from '@/lib/server-api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sbotech.in'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic pages arrays
  let blogPages: MetadataRoute.Sitemap = []
  let workPages: MetadataRoute.Sitemap = []

  try {
    // Fetch all published blog posts
    const blogsResponse = await serverBlogApi.getAll({ 
      status: 'published',
      limit: 1000 // Get all published posts
    })
    
    if (blogsResponse.success && blogsResponse.data) {
      blogPages = blogsResponse.data.map((post: any) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    }

    // Fetch all published projects
    const projectsResponse = await serverProjectApi.getAll({ 
      status: 'published',
      limit: 1000 // Get all published projects
    })
    
    if (projectsResponse.success && projectsResponse.data) {
      workPages = projectsResponse.data.map((project: any) => ({
        url: `${baseUrl}/work/${project.slug}`,
        lastModified: new Date(project.updatedAt || project.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap entries:', error)
    // If there's an error fetching dynamic content, we'll still return static pages
  }

  // Combine all pages
  return [...staticPages, ...blogPages, ...workPages]
} 