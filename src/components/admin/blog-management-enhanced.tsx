"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { blogApi } from "@/lib/api"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    bio: string
  }
  publishedAt: string
  readTime: string
  category: string
  featured: boolean
  image: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  slug?: string
  createdAt: string
  updatedAt: string
}

// Add this interface for the form data
interface BlogPostFormData {
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
    bio: string
  }
  publishedAt: string
  readTime: string
  category: string
  featured: boolean
  image: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
}

const categories = ['All', 'Development', 'Performance', 'AI & Innovation', 'Tutorial', 'Business', 'Security']
const statuses = ['All', 'published', 'draft', 'archived']

export function BlogManagementEnhanced() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'updatedAt' | 'createdAt' | 'title'>('updatedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [blogPosts, searchTerm, selectedCategory, selectedStatus, showFeaturedOnly, sortBy, sortOrder])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const response = await blogApi.getAll()
      setBlogPosts(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching blog posts:', err)
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...blogPosts]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(post => post.status === selectedStatus)
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(post => post.featured)
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = sortBy === 'title' ? a[sortBy] : new Date(a[sortBy]).getTime()
      const bValue = sortBy === 'title' ? b[sortBy] : new Date(b[sortBy]).getTime()
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredPosts(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      await blogApi.delete(id)
      setBlogPosts(prev => prev.filter(post => post._id !== id))
    } catch (err) {
      console.error('Error deleting blog post:', err)
      alert('Failed to delete blog post')
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'draft' | 'published' | 'archived') => {
    try {
      const post = blogPosts.find(p => p._id === id)
      if (!post) return

      console.log('Updating post status:', { id, newStatus, postTitle: post.title })
      const updateData = { ...post, status: newStatus }
      console.log('Update data being sent:', updateData)
      
      await blogApi.update(id, updateData)
      setBlogPosts(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p))
      console.log('Status updated successfully')
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update status')
    }
  }

  const handleToggleFeatured = async (id: string) => {
    try {
      const post = blogPosts.find(p => p._id === id)
      if (!post) return

      await blogApi.update(id, { ...post, featured: !post.featured })
      setBlogPosts(prev => prev.map(p => p._id === id ? { ...p, featured: !p.featured } : p))
    } catch (err) {
      console.error('Error toggling featured:', err)
      alert('Failed to toggle featured status')
    }
  }

  const handleSavePost = async (postData: BlogPostFormData) => {
    try {
      if (editingPost) {
        // Update existing post
        await blogApi.update(editingPost._id, postData)
      } else {
        // Create new post
        await blogApi.create(postData)
      }
      fetchBlogPosts()
    } catch (err: any) {
      throw new Error(err.message || 'Failed to save blog post')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case 'draft':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />
      case 'archived':
        return <XCircleIcon className="w-4 h-4 text-gray-500" />
      default:
        return <ClockIcon className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get counts for each status
  const statusCounts = {
    all: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    draft: blogPosts.filter(p => p.status === 'draft').length,
    archived: blogPosts.filter(p => p.status === 'archived').length,
    featured: blogPosts.filter(p => p.featured).length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">
            {filteredPosts.length} of {blogPosts.length} posts
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{statusCounts.all}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{statusCounts.published}</p>
            <p className="text-sm text-muted-foreground">Published</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.draft}</p>
            <p className="text-sm text-muted-foreground">Draft</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{statusCounts.archived}</p>
            <p className="text-sm text-muted-foreground">Archived</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{statusCounts.featured}</p>
            <p className="text-sm text-muted-foreground">Featured</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field as 'updatedAt' | 'createdAt' | 'title')
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="updatedAt-desc">Latest Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
            <option value="createdAt-desc">Latest Created</option>
            <option value="createdAt-asc">Oldest Created</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
            />
            <span className="text-sm">Show featured posts only</span>
          </label>
        </div>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No blog posts found matching your filters.</p>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post._id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(post.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(post.status)}`}
                    >
                      {post.status}
                    </span>
                    {post.featured && (
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <span className="text-xs text-muted-foreground">{post.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>By {post.author.name}</span>
                    <span>{post.readTime}</span>
                    <span>Updated {formatDate(post.updatedAt)}</span>
                    <span>{post.tags.length} tags</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    {/* Status Change Buttons */}
                    {post.status !== 'published' && (
                      <button
                        onClick={() => handleStatusChange(post._id, 'published')}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Publish"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                    )}
                    {post.status !== 'draft' && (
                      <button
                        onClick={() => handleStatusChange(post._id, 'draft')}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                        title="Move to Draft"
                      >
                        <ClockIcon className="w-4 h-4" />
                      </button>
                    )}
                    {post.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(post._id, 'archived')}
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="Archive"
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Featured Toggle */}
                    <button
                      onClick={() => handleToggleFeatured(post._id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        post.featured
                          ? 'text-yellow-600 hover:bg-yellow-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={post.featured ? 'Remove from Featured' : 'Add to Featured'}
                    >
                      <StarIcon className={`w-4 h-4 ${post.featured ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Main Actions */}
                  <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
                    <button
                      onClick={() => {
                        setEditingPost(post)
                        setShowEditModal(true)
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
          <button 
            onClick={fetchBlogPosts}
            className="mt-2 text-sm text-destructive hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Modals would go here - CreatePostModal, EditPostModal */}
      {/* For now, these are placeholders */}
      {showCreateModal && (
        <BlogPostModal
          post={editingPost}
          onClose={() => {
            setShowCreateModal(false)
            setEditingPost(null)
          }}
          onSave={handleSavePost}
        />
      )}

      {showEditModal && editingPost && (
        <BlogPostModal
          post={editingPost}
          onClose={() => {
            setShowEditModal(false)
            setEditingPost(null)
          }}
          onSave={handleSavePost}
        />
      )}
    </div>
  )
} 

interface BlogPostModalProps {
  post?: BlogPost | null
  onClose: () => void
  onSave: (post: BlogPostFormData) => void
}

function BlogPostModal({ post, onClose, onSave }: BlogPostModalProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: {
      name: post?.author?.name || 'SBO Tech Team',
      avatar: post?.author?.avatar || '/placeholder-avatar.svg',
      role: post?.author?.role || 'Lead Developer',
      bio: post?.author?.bio || 'Expert in Shopify app development.'
    },
    publishedAt: post?.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    readTime: post?.readTime || '5 min read',
    category: post?.category || 'Development',
    featured: post?.featured || false,
    image: post?.image || '/hero-image.jpg',
    tags: post?.tags || [],
    status: post?.status || 'draft'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newTag, setNewTag] = useState('')

  const categories = ['Development', 'Performance', 'AI & Innovation', 'Tutorial', 'Business', 'Security']
  const statuses = ['draft', 'published', 'archived']

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof BlogPostFormData] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await onSave(formData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save blog post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt *</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              required
              rows={10}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Author Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Author Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.author.name}
                  onChange={(e) => handleChange('author.name', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={formData.author.role}
                  onChange={(e) => handleChange('author.role', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={formData.author.avatar}
                  onChange={(e) => handleChange('author.avatar', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <input
                  type="text"
                  value={formData.author.bio}
                  onChange={(e) => handleChange('author.bio', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Metadata</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-2">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => handleChange('publishedAt', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => handleChange('readTime', e.target.value)}
                  placeholder="5 min read"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image and Featured */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-4 h-4 text-primary border-input rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-input bg-background text-foreground rounded-md hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 