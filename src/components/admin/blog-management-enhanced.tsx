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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Blog Post</h2>
            <p className="text-muted-foreground mb-4">This would open a full blog post creation form.</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditModal && editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Blog Post</h2>
            <p className="text-muted-foreground mb-2">Editing: {editingPost.title}</p>
            <p className="text-muted-foreground mb-4">This would open a full blog post editing form.</p>
            <button
              onClick={() => {
                setShowEditModal(false)
                setEditingPost(null)
              }}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 