import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const subscriber = await NewsletterSubscriber.findById(params.id).lean()
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: subscriber
    })
  } catch (error) {
    console.error('Error fetching newsletter subscriber:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriber' },
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
    const { isActive, firstName, lastName } = body

    const updateData: any = {}
    if (isActive !== undefined) updateData.isActive = isActive
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName

    const subscriber = await NewsletterSubscriber.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).lean()

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: subscriber
    })
  } catch (error) {
    console.error('Error updating newsletter subscriber:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update subscriber' },
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
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(params.id)
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting newsletter subscriber:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
} 