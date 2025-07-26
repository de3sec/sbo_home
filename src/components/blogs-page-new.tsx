"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { blogApi } from "@/lib/api"
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline"
import { BlogSkeleton } from "./skeletons/blog-skeleton"

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
}

const categories = [
  "All",
  "Development",
  "Performance", 
  "AI & Innovation",
  "Tutorial",
  "Business",
  "Security"
]

export function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchBlogPosts()
  }, [])



  const fetchBlogPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      const response = await blogApi.getAll({ status: 'published', limit: 100 })
      setBlogPosts(response.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching blog posts:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]
  // Show all filtered posts in the grid, including the featured one
  const gridPosts = filteredPosts



  if (loading) {
    return (
      <Layout>
        <BlogSkeleton />
      </Layout>
    )
  }

  if (error && blogPosts.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-muted-foreground mb-4">This might be due to database connection issues. Please check if MongoDB is running and the seed script has been executed.</p>
            <button 
              onClick={() => fetchBlogPosts(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              SBO Tech Blog
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
              Insights, tutorials, and expert advice on Shopify development, e-commerce optimization, and digital business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Featured Post
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={featuredPost.author.avatar} />
                      <AvatarFallback className="text-xs">{featuredPost.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  prefetch={false}
                >
                  Read Full Article
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="w-full py-8 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => fetchBlogPosts(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh blog posts"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="text-xs">{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ClockIcon className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                    prefetch={false}
                  >
                    Read More
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {gridPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
} 