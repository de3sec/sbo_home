"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

interface BlogPostData {
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

interface BlogPostProps {
  post: BlogPostData
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <Layout>
      {/* Back to Blog */}
      <section className="w-full py-6 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-6">
            {/* Category and Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
        </div>
      </section>

      {/* Author Bio */}
      <section className="w-full py-8 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">About {post.author.name}</h3>
                <p className="text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Posts CTA */}
      <section className="w-full py-12 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Want to Read More?</h2>
          <p className="text-muted-foreground mb-6">
            Explore more insights and tutorials on Shopify development and e-commerce optimization.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            prefetch={false}
          >
            Browse All Posts
          </Link>
        </div>
      </section>
    </Layout>
  )
} 