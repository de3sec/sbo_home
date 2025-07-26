"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { blogApi } from "@/lib/api"
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  UserIcon
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
  createdAt?: string
  updatedAt?: string
}

const sampleBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "10 Essential Shopify App Development Best Practices for 2025",
    excerpt: "Discover the latest best practices for developing high-performance Shopify apps that drive conversions and enhance user experience.",
    content: "Shopify app development has evolved significantly over the past few years...",
    author: {
      name: "SBO Tech Team",
      avatar: "/placeholder-avatar.svg",
      role: "Lead Developer",
      bio: "Expert in Shopify app development with 8+ years of experience."
    },
    publishedAt: "2025-01-15",
    readTime: "8 min read",
    category: "Development",
    featured: true,
    image: "/hero-image.jpg",
    tags: ["Shopify", "App Development", "Best Practices"],
    status: "published"
  },
  {
    _id: "2",
    title: "How to Optimize Your Shopify Store for Maximum Performance",
    excerpt: "Learn proven techniques to speed up your Shopify store and improve your Core Web Vitals scores for better SEO and user experience.",
    content: "Performance optimization is crucial for any e-commerce store...",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder-avatar.svg",
      role: "Performance Engineer",
      bio: "Specialized in performance optimization and Core Web Vitals."
    },
    publishedAt: "2025-01-12",
    readTime: "12 min read",
    category: "Performance",
    featured: false,
    image: "/services-image.jpg",
    tags: ["Performance", "SEO", "Optimization"],
    status: "published"
  },
  {
    _id: "3",
    title: "The Future of E-commerce: AI-Powered Shopify Solutions",
    excerpt: "Explore how artificial intelligence is revolutionizing the e-commerce landscape and how you can leverage AI in your Shopify store.",
    content: "Artificial intelligence is no longer a futuristic concept...",
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-avatar.svg",
      role: "AI Specialist",
      bio: "AI and machine learning expert focused on e-commerce solutions."
    },
    publishedAt: "2025-01-10",
    readTime: "15 min read",
    category: "AI & Innovation",
    featured: false,
    image: "/hero-image.jpg",
    tags: ["AI", "E-commerce", "Innovation"],
    status: "draft"
  }
]

const categories = [
  "Development",
  "Performance", 
  "AI & Innovation",
  "Tutorial",
  "Business",
  "Security"
]

export function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedStatus, setSelectedStatus] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (selectedCategory !== "All") params.category = selectedCategory
      if (selectedStatus !== "All") params.status = selectedStatus
      
      const response = await blogApi.getAll(params)
      setBlogPosts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  // Refetch when filters change
  useEffect(() => {
    fetchBlogPosts()
  }, [selectedCategory, selectedStatus])

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || post.status === selectedStatus
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogApi.delete(id)
        setBlogPosts(blogPosts.filter(post => post._id !== id))
      } catch (err) {
        console.error('Error deleting blog post:', err)
        alert('Failed to delete blog post')
      }
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'draft' | 'published' | 'archived') => {
    try {
      const post = blogPosts.find(p => p._id === id)
      if (!post) return
      
      await blogApi.update(id, { ...post, status: newStatus })
      setBlogPosts(blogPosts.map(post => 
        post._id === id ? { ...post, status: newStatus } : post
      ))
    } catch (err) {
      console.error('Error updating blog post status:', err)
      alert('Failed to update blog post status')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-500'
      case 'draft': return 'bg-orange-500/10 text-orange-500'
      case 'archived': return 'bg-gray-500/10 text-gray-500'
      default: return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <PlusIcon className="w-4 h-4" />
          Add New Post
        </button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm hover:bg-accent hover:text-accent-foreground">
              Clear Filters
            </button>
          </div>
        </div>
      </Card>

      {/* Blog Posts Table */}
      <Card className="p-6">
        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={fetchBlogPosts}
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
            <div key={post._id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              {/* Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted/20 flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-3 h-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TagIcon className="w-3 h-3" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    
                                         <select
                       value={post.status}
                       onChange={(e) => handleStatusChange(post._id, e.target.value as 'draft' | 'published' | 'archived')}
                       className="px-2 py-1 rounded border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
                     >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button 
                      onClick={() => setEditingPost(post)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    
                                         <button 
                       onClick={() => window.open(`/blogs/${post._id}`, '_blank')}
                       className="p-1 hover:bg-muted rounded transition-colors"
                       title="View"
                     >
                       <EyeIcon className="w-4 h-4" />
                     </button>
                     
                     <button 
                       onClick={() => handleDeletePost(post._id)}
                       className="p-1 hover:bg-muted rounded transition-colors text-red-500 hover:text-red-600"
                       title="Delete"
                     >
                       <TrashIcon className="w-4 h-4" />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || editingPost) && (
        <BlogPostModal
          post={editingPost}
          onClose={() => {
            setIsCreateModalOpen(false)
            setEditingPost(null)
          }}
          onSave={async (post) => {
            try {
              if (editingPost) {
                await blogApi.update(editingPost._id, post)
                setBlogPosts(blogPosts.map(p => p._id === editingPost._id ? { ...post, _id: editingPost._id } : p))
              } else {
                const response = await blogApi.create(post)
                setBlogPosts([...blogPosts, response.data])
              }
              setIsCreateModalOpen(false)
              setEditingPost(null)
            } catch (err) {
              console.error('Error saving blog post:', err)
              alert('Failed to save blog post')
            }
          }}
        />
      )}
    </div>
  )
}

interface BlogPostModalProps {
  post?: BlogPost | null
  onClose: () => void
  onSave: (post: BlogPost) => void
}

function BlogPostModal({ post, onClose, onSave }: BlogPostModalProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>(
    post || {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      status: "draft",
      featured: false,
      image: "/hero-image.jpg",
      author: {
        name: "SBO Tech Team",
        avatar: "/placeholder-avatar.svg",
        role: "Lead Developer",
        bio: "Expert in Shopify app development."
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: "5 min read"
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as BlogPost)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {post ? "Edit Blog Post" : "Create New Blog Post"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Published Date</label>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g., 5 min read"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags?.join(", ")}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(", ").filter(tag => tag.trim()) })}
                placeholder="Shopify, Development, Best Practices"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-input"
              />
              <span className="text-sm">Featured Post</span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            >
              {post ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 