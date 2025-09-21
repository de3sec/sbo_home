"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { blogApi } from "@/lib/api"
import { getAbsoluteImageUrl } from "@/lib/utils"
import { CalendarIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline"
import { BlogSkeleton } from "./skeletons/blog-skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [pageChanging, setPageChanging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get initial values from URL params
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All")
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'))
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const postsPerPage = 9 // 3x3 grid

  const fetchBlogPosts = useCallback(async (isRefresh = false, isPageChange = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else if (isPageChange) {
        setPageChanging(true)
      } else {
        setLoading(true)
      }
      
      const params = {
        status: 'published',
        limit: postsPerPage,
        page: currentPage,
        ...(selectedCategory !== 'All' && { category: selectedCategory })
      }
      
      const response = await blogApi.getAll(params)
      setBlogPosts(response.data || [])
      setTotalPages(response.pagination?.pages || 1)
      setTotalPosts(response.pagination?.total || 0)
      setError(null)
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching blog posts:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
      setPageChanging(false)
    }
  }, [currentPage, selectedCategory, postsPerPage])

  useEffect(() => {
    fetchBlogPosts()
  }, [fetchBlogPosts])

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]
  // Show all blog posts in the grid, including the featured one
  const gridPosts = blogPosts

  const updateURL = useCallback((newCategory: string, newPage: number) => {
    const params = new URLSearchParams()
    if (newCategory !== "All") {
      params.set('category', newCategory)
    }
    if (newPage > 1) {
      params.set('page', newPage.toString())
    }
    
    const queryString = params.toString()
    const newUrl = queryString ? `/blogs?${queryString}` : '/blogs'
    router.push(newUrl, { scroll: false })
  }, [router])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when changing category
    updateURL(category, 1)
    fetchBlogPosts(false, true) // Indicate this is a category change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL(selectedCategory, page)
    fetchBlogPosts(false, true) // Indicate this is a page change
    // Smooth scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (loading) {
    return (
      <Layout>
        <BlogSkeleton />
      </Layout>
    )
  }

  if (error && blogPosts.length === 0 && !loading) {
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
              Shopify Development Insights & Expert Tutorials
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
              Stay ahead of the competition with expert insights on Shopify development, e-commerce optimization, 
              and digital commerce strategies. Our comprehensive tutorials and industry analysis help businesses 
              across the US, Europe, and Australia maximize their Shopify potential.
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
                  Featured Article
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
                      <AvatarImage src={featuredPost.author.avatar} alt={`${featuredPost.author.name} - ${featuredPost.author.role}`} />
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
                  src={getAbsoluteImageUrl(featuredPost.image)}
                  alt={`${featuredPost.title} - Featured Shopify Development Article`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
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
                  onClick={() => handleCategoryChange(category)}
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
          <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${pageChanging ? 'opacity-60 pointer-events-none' : ''} transition-opacity duration-200`}>
            {gridPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getAbsoluteImageUrl(post.image)}
                    alt={`${post.title} - Shopify Development Article by SBO Tech`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
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
                        <AvatarImage src={post.author.avatar} alt={`${post.author.name} - ${post.author.role}`} />
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
                    Read Article
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center space-y-4 mt-12">
              <div className="text-sm text-muted-foreground">
                Showing page {currentPage} of {totalPages} ({totalPosts} total posts)
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
} 