import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const { email, firstName, lastName, source = 'homepage' } = body

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email: email.toLowerCase() })
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { success: false, error: 'Email is already subscribed' },
          { status: 409 }
        )
      } else {
        // Reactivate existing subscriber
        existingSubscriber.isActive = true
        existingSubscriber.subscribedAt = new Date()
        existingSubscriber.consentGiven = true
        existingSubscriber.consentDate = new Date()
        existingSubscriber.ipAddress = ipAddress
        existingSubscriber.userAgent = userAgent
        await existingSubscriber.save()
        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
          data: existingSubscriber
        })
      }
    }

    // Create new subscriber
    const subscriber = new NewsletterSubscriber({
      email: email.toLowerCase(),
      firstName,
      lastName,
      source,
      consentGiven: true,
      consentDate: new Date(),
      ipAddress,
      userAgent
    })

    await subscriber.save()

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
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

    const skip = (page - 1) * limit
    const query: any = {}

    if (status === 'active') {
      query.isActive = true
    } else if (status === 'inactive') {
      query.isActive = false
    }

    const subscribers = await NewsletterSubscriber.find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await NewsletterSubscriber.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
} 