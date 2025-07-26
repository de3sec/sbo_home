import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

// GET /api/projects - Get all projects with optional filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    
    // Build query
    const query: any = {}
    if (status) query.status = status
    if (category) query.category = category
    
    // Execute query with pagination
    const skip = (page - 1) * limit
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    // Get total count for pagination
    const total = await Project.countDocuments(query)
    
    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description || !body.longDescription || !body.category || !body.client || !body.impact || !body.timeline || !body.team) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new project
    const project = new Project(body)
    await project.save()
    
    return NextResponse.json({
      success: true,
      data: project
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
} 