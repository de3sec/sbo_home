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
      title: `${post.title} - SBO Tech Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post - SBO Tech',
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
    
    return <BlogPost post={post} />
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
} 