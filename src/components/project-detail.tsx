import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  UsersIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  CodeBracketIcon
} from "@heroicons/react/24/outline"

interface ProjectDetailProps {
  project: {
    id: number
    title: string
    category: string
    description: string
    longDescription: string
    features: string[]
    technologies: string[]
    image: string
    status: string
    client: string
    impact: string
    timeline: string
    team: string
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <Layout>
        {/* Back to Work */}
        <section className="w-full py-6 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              prefetch={false}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Work
            </Link>
          </div>
        </section>

        {/* Project Header */}
        <section className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Category and Status */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                    {project.category}
                  </span>
                  <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-green-500 font-medium">
                    {project.status}
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
                <div className="flex flex-wrap items-center gap-6 py-6 border-t border-b border-border">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-green-500">{project.impact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <span>{project.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-muted-foreground" />
                    <span>{project.team}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="w-full py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                {/* Main Content */}
                <article className="prose prose-lg prose-invert max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                    className="space-y-6"
                  />
                </article>

                {/* Sidebar */}
                <aside className="space-y-8">
                  {/* Features */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary" />
                      Key Features
                    </h3>
                    <div className="space-y-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Technologies */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CodeBracketIcon className="w-5 h-5 text-primary" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>

                  {/* Project Stats */}
                  <Card className="p-6 bg-muted/30">
                    <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{project.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Team Size:</span>
                        <span className="font-medium">{project.team}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Impact:</span>
                        <span className="font-medium text-green-500">{project.impact}</span>
                      </div>
                    </div>
                  </Card>

                  {/* CTA */}
                  <Card className="p-6 bg-primary/10 border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Ready to Start Your Project?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Let&apos;s discuss how we can help you achieve similar results.
                    </p>
                    <Link
                      href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 w-full"
                      prefetch={false}
                    >
                      Get Started
                    </Link>
                  </Card>
                </aside>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
} 