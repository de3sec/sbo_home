import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sbo_tech'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }
    
    const connectionOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: false,
      tls: false,
      authSource: 'admin'
    }
    
    await mongoose.connect(MONGODB_URI, connectionOptions)
    return mongoose.connection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export default dbConnect 