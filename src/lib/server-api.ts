// Server-side API functions that directly connect to the database
import dbConnect from './mongodb'
import BlogPost from '@/models/BlogPost'
import Project from '@/models/Project'

// Blog Posts API (Server-side)
export const serverBlogApi = {
  // Get all blog posts with optional filters
  getAll: async (params?: {
    status?: string
    category?: string
    featured?: boolean
    limit?: number
    page?: number
  }) => {
    await dbConnect()
    
    const query: any = {}
    if (params?.status) query.status = params.status
    if (params?.category) query.category = params.category
    if (params?.featured !== undefined) query.featured = params.featured
    
    const limit = params?.limit || 10
    const page = params?.page || 1
    const skip = (page - 1) * limit
    
    const blogPosts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await BlogPost.countDocuments(query)
    
    return {
      success: true,
      data: blogPosts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  },

  // Get a single blog post by ID
  getById: async (id: string) => {
    await dbConnect()
    
    const blogPost = await BlogPost.findById(id).lean()
    
    if (!blogPost) {
      throw new Error('Blog post not found')
    }
    
    return {
      success: true,
      data: blogPost
    }
  },

  // Get a single blog post by slug
  getBySlug: async (slug: string) => {
    await dbConnect()
    
    const blogPost = await BlogPost.findOne({ slug }).lean()
    
    if (!blogPost) {
      throw new Error('Blog post not found')
    }
    
    return {
      success: true,
      data: blogPost
    }
  }
}

// Projects API (Server-side)
export const serverProjectApi = {
  // Get all projects with optional filters
  getAll: async (params?: {
    status?: string
    category?: string
    limit?: number
    page?: number
  }) => {
    await dbConnect()
    
    const query: any = {}
    if (params?.status) query.status = params.status
    if (params?.category) query.category = params.category
    
    const limit = params?.limit || 10
    const page = params?.page || 1
    const skip = (page - 1) * limit
    
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await Project.countDocuments(query)
    
    return {
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  },

  // Get a single project by ID
  getById: async (id: string) => {
    await dbConnect()
    
    const project = await Project.findById(id).lean()
    
    if (!project) {
      throw new Error('Project not found')
    }
    
    return {
      success: true,
      data: project
    }
  },

  // Get a single project by slug
  getBySlug: async (slug: string) => {
    await dbConnect()
    
    const project = await Project.findOne({ slug }).lean()
    
    if (!project) {
      throw new Error('Project not found')
    }
    
    return {
      success: true,
      data: project
    }
  }
} 