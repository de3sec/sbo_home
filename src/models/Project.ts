import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Product Management', 'Analytics & Tracking', 'Catalog Management', 'Logistics & Fulfillment', 'Architecture', 'Operations']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  longDescription: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: '/hero-image.jpg'
  },
  status: {
    type: String,
    enum: ['live', 'in-development', 'completed', 'archived'],
    default: 'in-development'
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  impact: {
    type: String,
    required: true,
    trim: true
  },
  timeline: {
    type: String,
    required: true,
    trim: true
  },
  team: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
})

// Generate slug from title before saving
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

// Add index for better query performance
projectSchema.index({ status: 1, category: 1, createdAt: -1 })

export default mongoose.models.Project || mongoose.model('Project', projectSchema) 