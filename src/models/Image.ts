import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    default: 'general'
  },
  alt: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  uploadedBy: {
    type: String,
    default: 'Admin'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Add indexes for better query performance
imageSchema.index({ filename: 1, uploadedAt: -1 })
imageSchema.index({ category: 1 })
imageSchema.index({ tags: 1 })

export default mongoose.models.Image || mongoose.model('Image', imageSchema) 