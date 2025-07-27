import dbConnect from '../lib/mongodb'
import Image from '../models/Image'

async function migrateImageUrls() {
  try {
    console.log('Connecting to database...')
    await dbConnect()
    
    console.log('Finding images with old URL format...')
    // Find all images that still have the old /uploads/ URL format
    const imagesToUpdate = await Image.find({
      url: { $regex: '^/uploads/' }
    })
    
    console.log(`Found ${imagesToUpdate.length} images to update`)
    
    if (imagesToUpdate.length === 0) {
      console.log('No images need updating. All URLs are already in the correct format.')
      process.exit(0)
    }
    
    // Update each image URL from /uploads/ to /api/uploads/
    let updatedCount = 0
    for (const image of imagesToUpdate) {
      const oldUrl = image.url
      const newUrl = oldUrl.replace('/uploads/', '/api/uploads/')
      
      await Image.updateOne(
        { _id: image._id },
        { $set: { url: newUrl } }
      )
      
      console.log(`Updated: ${oldUrl} → ${newUrl}`)
      updatedCount++
    }
    
    console.log(`\n✅ Migration completed successfully!`)
    console.log(`📊 Updated ${updatedCount} image URLs`)
    console.log(`\nAll image URLs have been updated to use the new API route format.`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during migration:', error)
    process.exit(1)
  }
}

// Run the migration
migrateImageUrls()