"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { 
  ArrowLeftIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
  CodeBracketIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline"

interface ProjectData {
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

interface ProjectDetailProps {
  project: ProjectData
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <Layout>
      {/* Back to Work */}
      <section className="w-full py-6 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Work
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-6">
            {/* Category and Status */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                {project.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'live' 
                  ? 'bg-green-500/10 text-green-500' 
                  : project.status === 'completed'
                  ? 'bg-purple-500/10 text-purple-500'
                  : 'bg-blue-500/10 text-blue-500'
              }`}>
                {project.status === 'in-development' ? 'In Development' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Client</div>
                  <div className="font-medium">{project.client}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Timeline</div>
                  <div className="font-medium">{project.timeline}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Impact</div>
                  <div className="font-medium text-green-500">{project.impact}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CodeBracketIcon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Team</div>
                  <div className="font-medium">{project.team}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {project.image && (
        <section className="w-full py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted/20">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Card className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
          </Card>
        </div>
      </section>

      {/* Features and Technologies */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Features */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Technologies */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-6">
            Let&apos;s discuss how we can help you build the perfect Shopify solution for your business.
          </p>
          <Link
            href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </section>
    </Layout>
  )
} 