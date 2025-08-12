import { NextRequest, NextResponse } from 'next/server'
import { supabase, STORAGE_BUCKET } from '@/lib/supabase'
import dbConnect from '@/lib/mongodb'
import Image from '@/models/Image'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables not configured')
      return NextResponse.json({ 
        error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' 
      }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const tags = formData.get('tags') as string
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${fileExtension}`
    const filePath = `${STORAGE_BUCKET}/${filename}`

    // Convert file to buffer
    const buffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      console.error('Upload details:', { filename, bucket: STORAGE_BUCKET, fileSize: file.size, fileType: file.type })
      return NextResponse.json({ 
        error: 'Failed to upload file to Supabase', 
        details: uploadError.message,
        supabaseError: uploadError
      }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filename)

    // Save to database
    await dbConnect()
    
    const image = new Image({
      filename: file.name,
      originalName: file.name,
      url: publicUrl,
      path: filePath,
      size: file.size,
      mimetype: file.type,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category: category || 'general',
      uploadedAt: new Date()
    })

    await image.save()

    return NextResponse.json({
      success: true,
      image: {
        id: image._id,
        filename: image.filename,
        url: image.url,
        path: image.path,
        size: image.size,
        mimetype: image.mimetype,
        tags: image.tags,
        category: image.category,
        uploadedAt: image.uploadedAt
      }
    })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    let query: any = {}

    if (category) {
      query.category = category
    }

    if (tag) {
      query.tags = { $in: [tag] }
    }

    const images = await Image.find(query)
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Image.countDocuments(query)

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 