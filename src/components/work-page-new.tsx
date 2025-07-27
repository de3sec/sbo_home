"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { projectApi } from "@/lib/api"
import { getAbsoluteImageUrl } from "@/lib/utils"
import { 
  ShoppingCartIcon, 
  TagIcon, 
  UsersIcon, 
  ChartBarIcon,
  CalendarIcon,
  CodeBracketIcon
} from "@heroicons/react/24/outline"
import { WorkSkeleton } from "./skeletons/work-skeleton"

interface Project {
  _id: string
  title: string
  category: string
  description: string
  longDescription: string
  features: string[]
  technologies: string[]
  image: string
  status: 'live' | 'in-development' | 'completed' | 'archived'
  client: string
  impact: string
  timeline: string
  team: string
  slug?: string
}

const categories = [
  "All",
  "Product Management",
  "Analytics & Tracking",
  "Catalog Management",
  "Logistics & Fulfillment",
  "Architecture",
  "Operations"
]

export function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      // Fetch live and completed projects for the public work page
      const [liveResponse, completedResponse] = await Promise.all([
        projectApi.getAll({ status: 'live' }),
        projectApi.getAll({ status: 'completed' })
      ])
      const allProjects = [...liveResponse.data, ...completedResponse.data]
      setProjects(allProjects)
      setError(null)
    } catch (err) {
      setError('Failed to fetch projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const stats = [
    { number: projects.length.toString(), label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ]

  if (loading) {
    return (
      <Layout>
        <WorkSkeleton />
      </Layout>
    )
  }

  if (error && projects.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchProjects}
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
              Our Shopify Development Portfolio
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
              Discover our comprehensive collection of innovative Shopify apps and e-commerce solutions that have 
              transformed businesses across the US, Europe, and Australia. From custom app development to performance 
              optimization, each project demonstrates our expertise in driving measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full py-8 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
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
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Card key={project._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getAbsoluteImageUrl(project.image)}
                    alt={`${project.title} - Shopify App Development Project by SBO Tech`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Next.js will automatically generate srcSet for optimized images
                    priority={index < 3} // Optionally prioritize first few images
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'live' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {project.status === 'in-development' ? 'In Development' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-3 h-3" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <ChartBarIcon className="w-3 h-3" />
                    <span className="font-medium">{project.impact}</span>
                  </div>

                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                    prefetch={false}
                  >
                    View Project Details
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              Ready to Start Your Shopify Development Project?
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground text-lg">
              Whether you&apos;re in the US, Europe, or Australia, our Shopify development experts are ready to 
              help you build the perfect e-commerce solution for your business. Let&apos;s discuss your project requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              prefetch={false}
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
} 