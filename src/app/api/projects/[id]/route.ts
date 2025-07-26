import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

// GET /api/projects/[id] - Get a specific project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const project = await Project.findById(params.id).lean()
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const project = await Project.findByIdAndDelete(params.id)
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
} 