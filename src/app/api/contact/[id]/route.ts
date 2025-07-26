import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const message = await ContactMessage.findById(params.id).lean()
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Error fetching contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const body = await request.json()
    const { status, isRead } = body

    const updateData: any = {}
    if (status) updateData.status = status
    if (isRead !== undefined) updateData.isRead = isRead

    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).lean()

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Error updating contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const message = await ContactMessage.findByIdAndDelete(params.id)
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
} 