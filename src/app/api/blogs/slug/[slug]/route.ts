import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

// GET /api/blogs/slug/[slug] - Get a specific blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect()
    
    const blogPost = await BlogPost.findOne({ slug: params.slug }).lean()
    
    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: blogPost
    })
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
} 