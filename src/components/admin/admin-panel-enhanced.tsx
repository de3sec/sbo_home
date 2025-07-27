"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { BlogManagementEnhanced } from "./blog-management-enhanced"
import { WorkManagementEnhanced } from "./work-management-enhanced"
import { NewsletterManagement } from "./newsletter-management"
import { ContactManagement } from "./contact-management"
import { ImageManagement } from "./image-management"
import { Layout } from "../shared/layout"
import { analyticsApi } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import {
  ChartBarIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  EyeIcon,
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as DraftIcon
} from "@heroicons/react/24/outline"

interface AnalyticsData {
  overview: {
    totalContent: number
    totalBlogPosts: number
    totalProjects: number
    publishedContent: number
    contentThisMonth: number
    contentThisWeek: number
  }
  newsletter: {
    total: number
    active: number
    thisMonth: number
    thisWeek: number
  }
  contact: {
    total: number
    new: number
    read: number
    thisMonth: number
    thisWeek: number
  }
  blogPosts: {
    total: number
    published: number
    draft: number
    archived: number
    featured: number
    thisMonth: number
    thisWeek: number
    growth: number
    byCategory: Array<{ _id: string; count: number }>
  }
  projects: {
    total: number
    live: number
    inDevelopment: number
    completed: number
    archived: number
    thisMonth: number
    thisWeek: number
    growth: number
    byCategory: Array<{ _id: string; count: number }>
  }
  recentActivity: {
    blogPosts: Array<{ _id: string; title: string; status: string; createdAt: string; updatedAt: string }>
    projects: Array<{ _id: string; title: string; status: string; createdAt: string; updatedAt: string }>
  }
  performance: {
    averagePostsPerMonth: number
    averageProjectsPerMonth: number
    publicationRate: number
    completionRate: number
  }
}

export function AdminPanelEnhanced() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'projects' | 'newsletter' | 'contact' | 'images'>('dashboard')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await analyticsApi.getOverview()
      setAnalytics(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: string, type: 'blog' | 'project') => {
    if (type === 'blog') {
      switch (status) {
        case 'published':
          return <CheckCircleIcon className="w-4 h-4 text-green-500" />
        case 'draft':
          return <DraftIcon className="w-4 h-4 text-yellow-500" />
        case 'archived':
          return <XCircleIcon className="w-4 h-4 text-gray-500" />
        default:
          return <ClockIcon className="w-4 h-4 text-blue-500" />
      }
    } else {
      switch (status) {
        case 'live':
          return <CheckCircleIcon className="w-4 h-4 text-green-500" />
        case 'completed':
          return <CheckCircleIcon className="w-4 h-4 text-purple-500" />
        case 'in-development':
          return <ClockIcon className="w-4 h-4 text-blue-500" />
        case 'archived':
          return <XCircleIcon className="w-4 h-4 text-gray-500" />
        default:
          return <ClockIcon className="w-4 h-4 text-blue-500" />
      }
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and view analytics</p>
          </div>
          <button
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ChartBarIcon className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'blogs'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 inline mr-2" />
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BriefcaseIcon className="w-4 h-4 inline mr-2" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'images'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <EyeIcon className="w-4 h-4 inline mr-2" />
            Images
          </button>
          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'newsletter'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 inline mr-2" />
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 inline mr-2" />
            Contact
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && analytics && (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                    <p className="text-3xl font-bold">{analytics.overview.totalContent}</p>
                  </div>
                  <DocumentTextIcon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analytics.overview.contentThisWeek} created this week
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                    <p className="text-3xl font-bold">{analytics.blogPosts.total}</p>
                  </div>
                  <DocumentTextIcon className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analytics.blogPosts.published} published
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Projects</p>
                    <p className="text-3xl font-bold">{analytics.projects.total}</p>
                  </div>
                  <BriefcaseIcon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analytics.projects.live} live projects
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Publication Rate</p>
                    <p className="text-3xl font-bold">{analytics.performance.publicationRate}%</p>
                  </div>
                  <ArrowTrendingUpIcon className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Content publication efficiency
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Newsletter Subscribers</p>
                    <p className="text-3xl font-bold">{analytics.newsletter.total}</p>
                  </div>
                  <DocumentTextIcon className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analytics.newsletter.active} active subscribers
                </p>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact Messages</p>
                    <p className="text-3xl font-bold">{analytics.contact.total}</p>
                  </div>
                  <DocumentTextIcon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {analytics.contact.new} new messages
                </p>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Blog Posts Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Blog Posts Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Published</span>
                    </div>
                    <span className="font-medium">{analytics.blogPosts.published}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DraftIcon className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Draft</span>
                    </div>
                    <span className="font-medium">{analytics.blogPosts.draft}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Archived</span>
                    </div>
                    <span className="font-medium">{analytics.blogPosts.archived}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Featured</span>
                    </div>
                    <span className="font-medium">{analytics.blogPosts.featured}</span>
                  </div>
                </div>
              </Card>

              {/* Projects Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Projects Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Live</span>
                    </div>
                    <span className="font-medium">{analytics.projects.live}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">In Development</span>
                    </div>
                    <span className="font-medium">{analytics.projects.inDevelopment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="font-medium">{analytics.projects.completed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Archived</span>
                    </div>
                    <span className="font-medium">{analytics.projects.archived}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Blog Posts</h4>
                  <div className="space-y-3">
                    {analytics.recentActivity.blogPosts.map((post) => (
                      <div key={post._id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        {getStatusIcon(post.status, 'blog')}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Updated {formatDate(post.updatedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Projects</h4>
                  <div className="space-y-3">
                    {analytics.recentActivity.projects.map((project) => (
                      <div key={project._id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        {getStatusIcon(project.status, 'project')}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{project.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Updated {formatDate(project.updatedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Avg Posts/Month</p>
                <p className="text-2xl font-bold">{analytics.performance.averagePostsPerMonth}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Avg Projects/Month</p>
                <p className="text-2xl font-bold">{analytics.performance.averageProjectsPerMonth}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Publication Rate</p>
                <p className="text-2xl font-bold">{analytics.performance.publicationRate}%</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{analytics.performance.completionRate}%</p>
              </Card>
            </div>
          </div>
        )}

        {/* Blog Management */}
        {activeTab === 'blogs' && (
          <BlogManagementEnhanced />
        )}

        {/* Projects Management */}
        {activeTab === 'projects' && (
          <WorkManagementEnhanced />
        )}

        {/* Images Management */}
        {activeTab === 'images' && (
          <ImageManagement />
        )}

        {/* Newsletter Management */}
        {activeTab === 'newsletter' && (
          <NewsletterManagement />
        )}

        {/* Contact Management */}
        {activeTab === 'contact' && (
          <ContactManagement />
        )}

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
            <button 
              onClick={fetchAnalytics}
              className="mt-2 text-sm text-destructive hover:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
} 