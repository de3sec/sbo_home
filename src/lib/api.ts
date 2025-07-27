// API utility functions for frontend data fetching

// Get the base URL for API requests (works in both client and server)
function getApiBase() {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '/api'
  } else {
    // Server-side: use localhost for development
    return 'http://localhost:3000/api'
  }
}

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const API_BASE = getApiBase()
    const url = `${API_BASE}${endpoint}`
    
    console.log('API Request URL:', url) // Debug log
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

// Blog Posts API
export const blogApi = {
  // Get all blog posts with optional filters
  getAll: async (params?: {
    status?: string
    category?: string
    featured?: boolean
    limit?: number
    page?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.category) searchParams.append('category', params.category)
    if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())

    const queryString = searchParams.toString()
    return apiRequest(`/blogs${queryString ? `?${queryString}` : ''}`)
  },

  // Get a single blog post by ID
  getById: async (id: string) => {
    return apiRequest(`/blogs/${id}`)
  },

  // Get a single blog post by slug
  getBySlug: async (slug: string) => {
    return apiRequest(`/blogs/slug/${slug}`)
  },

  // Create a new blog post
  create: async (data: any) => {
    return apiRequest('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Update a blog post
  update: async (id: string, data: any) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete a blog post
  delete: async (id: string) => {
    return apiRequest(`/blogs/${id}`, {
      method: 'DELETE',
    })
  },
}

// Projects API
export const projectApi = {
  // Get all projects with optional filters
  getAll: async (params?: {
    status?: string
    category?: string
    limit?: number
    page?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.category) searchParams.append('category', params.category)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())

    const queryString = searchParams.toString()
    return apiRequest(`/projects${queryString ? `?${queryString}` : ''}`)
  },

  // Get a single project by ID
  getById: async (id: string) => {
    return apiRequest(`/projects/${id}`)
  },

  // Get a single project by slug
  getBySlug: async (slug: string) => {
    return apiRequest(`/projects/slug/${slug}`)
  },

  // Create a new project
  create: async (data: any) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Update a project
  update: async (id: string, data: any) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete a project
  delete: async (id: string) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    })
  },
}

// Analytics API
export const analyticsApi = {
  getOverview: async () => {
    return apiRequest('/analytics')
  },
  
  getDashboardStats: async () => {
    // This would connect to your analytics service
    return {
      pageViews: 2847,
      uniqueVisitors: 1234,
      avgSessionDuration: '4m 32s',
      bounceRate: '23%',
      topBlogPost: {
        title: '10 Essential Shopify App Development Best Practices for 2025',
        views: 1247
      },
      topProject: {
        title: 'Custom Product Feed Generator',
        views: 892
      }
    }
  }
}

// Newsletter API
export const newsletterApi = {
  // Subscribe to newsletter
  subscribe: async (data: { email: string; firstName?: string; lastName?: string; source?: string; consent?: boolean }) => {
    return apiRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Get all subscribers
  getAll: async (params?: {
    status?: string
    limit?: number
    page?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())

    const queryString = searchParams.toString()
    return apiRequest(`/newsletter${queryString ? `?${queryString}` : ''}`)
  },

  // Get a single subscriber
  getById: async (id: string) => {
    return apiRequest(`/newsletter/${id}`)
  },

  // Update a subscriber
  update: async (id: string, data: any) => {
    return apiRequest(`/newsletter/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete a subscriber
  delete: async (id: string) => {
    return apiRequest(`/newsletter/${id}`, {
      method: 'DELETE',
    })
  },
}

// Contact API
export const contactApi = {
  // Send contact message
  send: async (data: { name: string; email: string; subject: string; message: string; consent?: boolean }) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Get all messages
  getAll: async (params?: {
    status?: string
    isRead?: boolean
    limit?: number
    page?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.isRead !== undefined) searchParams.append('isRead', params.isRead.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())

    const queryString = searchParams.toString()
    return apiRequest(`/contact${queryString ? `?${queryString}` : ''}`)
  },

  // Get a single message
  getById: async (id: string) => {
    return apiRequest(`/contact/${id}`)
  },

  // Update a message
  update: async (id: string, data: any) => {
    return apiRequest(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete a message
  delete: async (id: string) => {
    return apiRequest(`/contact/${id}`, {
      method: 'DELETE',
    })
  },
}

// Image API
export const imageApi = {
  // Upload image
  upload: async (formData: FormData) => {
    const API_BASE = getApiBase()
    const url = `${API_BASE}/images`
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  },

  // Get all images
  getAll: async (params?: {
    search?: string
    tag?: string
    limit?: number
    page?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.append('search', params.search)
    if (params?.tag) searchParams.append('tag', params.tag)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.page) searchParams.append('page', params.page.toString())

    const queryString = searchParams.toString()
    return apiRequest(`/images${queryString ? `?${queryString}` : ''}`)
  },

  // Update image metadata
  update: async (id: string, data: any) => {
    return apiRequest(`/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete image
  delete: async (id: string) => {
    return apiRequest(`/images/${id}`, {
      method: 'DELETE',
    })
  },
} 