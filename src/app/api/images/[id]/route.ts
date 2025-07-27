import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import dbConnect from '@/lib/mongodb'
import Image from '@/models/Image'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const image = await Image.findById(params.id)
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Delete file from disk
    const filepath = join(process.cwd(), 'public', image.url)
    if (existsSync(filepath)) {
      await unlink(filepath)
    }

    // Delete from database
    await Image.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const body = await request.json()
    const { alt, description, tags, isPublic } = body

    const image = await Image.findByIdAndUpdate(
      params.id,
      {
        alt: alt || '',
        description: description || '',
        tags: tags || [],
        isPublic: isPublic !== undefined ? isPublic : true
      },
      { new: true }
    )

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: image
    })

  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 })
  }
} 