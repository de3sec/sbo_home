import { supabase, STORAGE_BUCKET } from '../lib/supabase'
import dbConnect from '../lib/mongodb'
import Image from '../models/Image'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

async function migrateImagesToSupabase() {
  try {
    console.log('Starting migration to Supabase...')
    
    // Connect to database
    await dbConnect()
    
    // Get all images from database
    const images = await Image.find({})
    console.log(`Found ${images.length} images to migrate`)
    
    let migrated = 0
    let failed = 0
    
    for (const image of images) {
      try {
        console.log(`Migrating: ${image.filename}`)
        
        // Check if image already has Supabase URL
        if (image.url.includes('supabase.co')) {
          console.log(`Skipping ${image.filename} - already migrated`)
          migrated++
          continue
        }
        
        // Try to find the local file
        const possiblePaths = [
          join(process.cwd(), 'public', 'uploads', image.filename),
          join(process.cwd(), 'uploads', image.filename),
          join(process.cwd(), '..', 'public', 'uploads', image.filename),
          join(process.cwd(), '..', 'uploads', image.filename),
        ]
        
        let filePath = null
        for (const path of possiblePaths) {
          if (existsSync(path)) {
            filePath = path
            break
          }
        }
        
        if (!filePath) {
          console.log(`File not found for ${image.filename}`)
          failed++
          continue
        }
        
        // Read file
        const fileBuffer = await readFile(filePath)
        
        // Upload to Supabase
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(image.filename, fileBuffer, {
            contentType: image.mimetype || 'image/jpeg',
            cacheControl: '3600',
            upsert: true
          })
        
        if (uploadError) {
          console.error(`Upload error for ${image.filename}:`, uploadError)
          failed++
          continue
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(image.filename)
        
        // Update database record
        await Image.findByIdAndUpdate(image._id, {
          url: publicUrl,
          path: `${STORAGE_BUCKET}/${image.filename}`,
          mimetype: image.mimetype || image.mimeType || 'image/jpeg'
        })
        
        console.log(`Successfully migrated ${image.filename}`)
        migrated++
        
      } catch (error) {
        console.error(`Error migrating ${image.filename}:`, error)
        failed++
      }
    }
    
    console.log(`Migration complete! Migrated: ${migrated}, Failed: ${failed}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    process.exit(0)
  }
}

migrateImagesToSupabase() 