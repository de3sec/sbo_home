import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Try multiple possible paths for different deployment environments
    const possiblePaths = [
      join(process.cwd(), 'public', 'uploads', ...params.path),
      join(process.cwd(), 'uploads', ...params.path),
      join(process.cwd(), '..', 'public', 'uploads', ...params.path),
      join(process.cwd(), '..', 'uploads', ...params.path),
    ]
    
    let filePath = possiblePaths[0]
    let fileExists = false
    
    for (const path of possiblePaths) {
      if (existsSync(path)) {
        filePath = path
        fileExists = true
        break
      }
    }
    
    console.log('API Route Debug:', {
      requestedPath: params.path,
      possiblePaths,
      foundPath: fileExists ? filePath : 'none',
      cwd: process.cwd()
    })
    
    if (!fileExists) {
      console.log('File not found in any of the possible paths:', possiblePaths)
      return NextResponse.json({ 
        error: 'File not found',
        debug: {
          requestedPath: params.path,
          possiblePaths,
          cwd: process.cwd()
        }
      }, { status: 404 })
    }

    const fileBuffer = await readFile(filePath)
    
    // Determine content type based on file extension
    const ext = params.path[params.path.length - 1].split('.').pop()?.toLowerCase()
    let contentType = 'application/octet-stream'
    
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg'
        break
      case 'png':
        contentType = 'image/png'
        break
      case 'gif':
        contentType = 'image/gif'
        break
      case 'webp':
        contentType = 'image/webp'
        break
      case 'svg':
        contentType = 'image/svg+xml'
        break
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 })
  }
}
