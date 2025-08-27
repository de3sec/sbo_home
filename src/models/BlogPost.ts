import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'SBO Tech Team'
  },
  avatar: {
    type: String,
    default: '/placeholder-avatar.svg'
  },
  role: {
    type: String,
    default: 'Lead Developer'
  },
  bio: {
    type: String,
    default: 'Expert in Shopify app development.'
  }
})

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: authorSchema,
    default: () => ({})
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  category: {
    type: String,
    required: true,
    enum: ['Development', 'Performance', 'AI & Innovation', 'Tutorial', 'Business', 'Security']
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: '/hero-image.png'
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
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
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

// Add index for better query performance
blogPostSchema.index({ status: 1, category: 1, publishedAt: -1 })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema) 