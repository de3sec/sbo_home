import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

// GET /api/blogs/[id] - Get a specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const blogPost = await BlogPost.findById(params.id).lean()
    
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
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    console.log('=== BLOG UPDATE API DEBUG ===')
    console.log('Updating post ID:', params.id)
    console.log('Request body:', body)
    console.log('Body keys:', Object.keys(body))
    
    // For partial updates (like status changes), we don't need to validate all required fields
    // Only validate if this is a full update (contains title, excerpt, content, category)
    if (body.title && body.excerpt && body.content && body.category) {
      // This is a full update, validate all required fields
      if (!body.title || !body.excerpt || !body.content || !body.category) {
        console.log('Validation failed - missing required fields')
        return NextResponse.json(
          { success: false, error: 'Missing required fields for full update' },
          { status: 400 }
        )
      }
    }
    
    console.log('Attempting database update...')
    const blogPost = await BlogPost.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!blogPost) {
      console.log('Blog post not found in database')
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    console.log('Database update successful:', { 
      id: blogPost._id, 
      title: blogPost.title, 
      status: blogPost.status 
    })
    
    return NextResponse.json({
      success: true,
      data: blogPost
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const blogPost = await BlogPost.findByIdAndDelete(params.id)
    
    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
} 