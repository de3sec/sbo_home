import mongoose, { Schema, Document } from 'mongoose'

export interface IContactMessage extends Document {
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  isRead: boolean
  status: 'new' | 'read' | 'replied' | 'archived'
  ipAddress?: string
  userAgent?: string
  consentGiven: boolean
  consentDate: Date
}

const contactMessageSchema = new Schema<IContactMessage>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  consentGiven: {
    type: Boolean,
    required: true,
    default: false
  },
  consentDate: {
    type: Date,
    default: Date.now
  }
})

// Create indexes
contactMessageSchema.index({ createdAt: -1 })
contactMessageSchema.index({ status: 1 })
contactMessageSchema.index({ isRead: 1 })
contactMessageSchema.index({ email: 1 })

export default mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema) 