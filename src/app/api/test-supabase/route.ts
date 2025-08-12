import { NextRequest, NextResponse } from 'next/server'
import { supabase, STORAGE_BUCKET } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        configured: false,
        error: 'Missing environment variables',
        missing: {
          url: !supabaseUrl,
          key: !supabaseKey
        }
      })
    }

    // Test Supabase connection
    const { data: buckets, error } = await supabase.storage.listBuckets()

    console.log('Supabase buckets response:', { buckets, error })

    if (error) {
      return NextResponse.json({
        configured: true,
        connected: false,
        error: error.message,
        details: error
      })
    }

    // Check if our bucket exists
    const imagesBucket = buckets?.find(bucket => bucket.name === STORAGE_BUCKET)

    return NextResponse.json({
      configured: true,
      connected: true,
      buckets: buckets?.map(b => b.name),
      imagesBucketExists: !!imagesBucket,
      imagesBucketPublic: imagesBucket?.public || false
    })

  } catch (error) {
    console.error('Supabase test error:', error)
    return NextResponse.json({
      configured: false,
      error: 'Failed to test Supabase connection',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 