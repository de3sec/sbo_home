import { NextRequest, NextResponse } from 'next/server'
import { supabase, STORAGE_BUCKET } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Setting up Supabase storage bucket...')

    // Create the images bucket
    const { data: bucket, error: bucketError } = await supabase.storage
      .createBucket(STORAGE_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      })

    if (bucketError) {
      // If bucket already exists, that's fine
      if (bucketError.message.includes('already exists')) {
        console.log('Bucket already exists, continuing...')
      } else {
        console.error('Error creating bucket:', bucketError)
        return NextResponse.json({
          success: false,
          error: 'Failed to create bucket',
          details: bucketError.message
        }, { status: 500 })
      }
    }

    // Test bucket access
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to verify bucket creation',
        details: listError.message
      }, { status: 500 })
    }

    const imagesBucket = buckets?.find(b => b.name === STORAGE_BUCKET)

    return NextResponse.json({
      success: true,
      message: 'Supabase storage setup complete',
      bucket: {
        name: STORAGE_BUCKET,
        exists: !!imagesBucket,
        public: imagesBucket?.public || false
      },
      allBuckets: buckets?.map(b => ({ name: b.name, public: b.public }))
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to setup Supabase storage',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 