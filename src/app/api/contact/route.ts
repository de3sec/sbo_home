import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactMessage from '@/models/ContactMessage'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const contactMessage = new ContactMessage({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress,
      userAgent,
      consentGiven: true,
      consentDate: new Date()
    })

    await contactMessage.save()

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: contactMessage
    })
  } catch (error) {
    console.error('Error sending contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const isRead = searchParams.get('isRead')

    const skip = (page - 1) * limit
    const query: any = {}

    if (status) {
      query.status = status
    }
    if (isRead !== null && isRead !== undefined) {
      query.isRead = isRead === 'true'
    }

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await ContactMessage.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
} 