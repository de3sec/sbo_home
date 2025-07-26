import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

// GET /api/blogs - Get all blog posts with optional filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (category) query.category = category
    if (featured) query.featured = featured === 'true'
    
    // Execute query with pagination
    const skip = (page - 1) * limit
    const blogPosts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    // Get total count for pagination
    const total = await BlogPost.countDocuments(query)
    
    // Debug logging
    console.log('=== API DEBUG ===')
    console.log('Query:', query)
    console.log('Limit:', limit)
    console.log('Page:', page)
    console.log('Skip:', skip)
    console.log('Total documents:', total)
    console.log('Returned documents:', blogPosts.length)
    console.log('Blog posts:', blogPosts.map(p => ({ title: p.title, category: p.category, featured: p.featured, status: p.status })))
    console.log('==================')
    
    return NextResponse.json({
      success: true,
      data: blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blogs - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new blog post
    const blogPost = new BlogPost(body)
    await blogPost.save()
    
    return NextResponse.json({
      success: true,
      data: blogPost
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
} 