import mongoose, { Schema, Document } from 'mongoose'

export interface INewsletterSubscriber extends Document {
  email: string
  firstName?: string
  lastName?: string
  subscribedAt: Date
  isActive: boolean
  source?: string
  consentGiven: boolean
  consentDate: Date
  ipAddress?: string
  userAgent?: string
}

const newsletterSubscriberSchema = new Schema<INewsletterSubscriber>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    default: 'homepage'
  },
  consentGiven: {
    type: Boolean,
    required: true,
    default: false
  },
  consentDate: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
})

// Create indexes
newsletterSubscriberSchema.index({ email: 1 })
newsletterSubscriberSchema.index({ subscribedAt: -1 })
newsletterSubscriberSchema.index({ isActive: 1 })

export default mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', newsletterSubscriberSchema) 