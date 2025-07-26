import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogApi } from '@/lib/api'
import { BlogPost } from '@/components/blog-post-new'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await blogApi.getById(params.id)
    const post = response.data
    
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
    const response = await blogApi.getById(params.id)
    const post = response.data
    
    if (!post || post.status !== 'published') {
      notFound()
    }
    
    return <BlogPost post={post} />
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
} 