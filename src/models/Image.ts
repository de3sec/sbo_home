import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: String,
    default: 'Admin'
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Add index for better query performance
imageSchema.index({ filename: 1, uploadedAt: -1 })

export default mongoose.models.Image || mongoose.model('Image', imageSchema) 