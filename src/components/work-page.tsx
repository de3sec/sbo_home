import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { 
  ShoppingCartIcon, 
  ChartBarIcon, 
  CogIcon, 
  MapPinIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon,
  GlobeAltIcon,
  CubeIcon
} from "@heroicons/react/24/outline"

const projects = [
  {
    id: 1,
    title: "Custom Product Feed Generator",
    category: "Product Management",
    description: "Advanced product feed generation system that creates optimized feeds for Google Shopping, Facebook Ads, and other marketing platforms with real-time inventory updates and dynamic pricing.",
    features: [
      "Real-time inventory synchronization",
      "Dynamic pricing integration",
      "Multi-platform feed generation",
      "Advanced filtering and mapping",
      "Automated feed updates",
      "Performance analytics"
    ],
    technologies: ["Shopify API", "Node.js", "React", "PostgreSQL", "Redis"],
    image: "/hero-image.jpg",
    status: "Live",
    client: "E-commerce Retailer",
    impact: "40% increase in ad conversion rates"
  },
  {
    id: 2,
    title: "Server-Side Google Tracking",
    category: "Analytics & Tracking",
    description: "Headless server-side Google Analytics and Google Ads tracking solution that provides accurate conversion tracking without client-side dependencies, ensuring data integrity and compliance.",
    features: [
      "Server-side event tracking",
      "Enhanced e-commerce tracking",
      "Cross-domain tracking",
      "Privacy compliance (GDPR/CCPA)",
      "Real-time data processing",
      "Custom event mapping"
    ],
    technologies: ["Google Analytics 4", "Google Ads API", "Node.js", "Cloud Functions", "BigQuery"],
    image: "/services-image.jpg",
    status: "Live",
    client: "Multi-brand Retailer",
    impact: "25% improvement in tracking accuracy"
  },
  {
    id: 3,
    title: "Sub Collection Creator App",
    category: "Catalog Management",
    description: "Intelligent sub-collection management system that automatically creates and manages product collections based on tags, attributes, and custom rules, streamlining catalog organization.",
    features: [
      "Automated collection creation",
      "Smart tagging system",
      "Bulk product management",
      "Custom collection rules",
      "SEO optimization",
      "Performance monitoring"
    ],
    technologies: ["Shopify Liquid", "JavaScript", "GraphQL", "MongoDB", "AWS Lambda"],
    image: "/hero-image.jpg",
    status: "Live",
    client: "Fashion Retailer",
    impact: "60% reduction in manual catalog work"
  },
  {
    id: 4,
    title: "Shopify Plus Pickup Point Customizer",
    category: "Logistics & Fulfillment",
    description: "Advanced pickup point management system for Shopify Plus stores with nearest warehouse detection, custom routing logic, and real-time inventory allocation for optimal customer experience.",
    features: [
      "Nearest warehouse detection",
      "Custom routing algorithms",
      "Real-time inventory allocation",
      "Pickup point management",
      "Customer notification system",
      "Analytics dashboard"
    ],
    technologies: ["Shopify Plus", "Location Services", "Python", "PostgreSQL", "Redis", "Google Maps API"],
    image: "/services-image.jpg",
    status: "Live",
    client: "Multi-location Retailer",
    impact: "35% faster order fulfillment"
  },
  {
    id: 5,
    title: "Headless E-commerce Platform",
    category: "Architecture",
    description: "Modern headless e-commerce solution built with Next.js frontend and Shopify backend, providing lightning-fast performance and seamless integration with third-party services.",
    features: [
      "Next.js frontend",
      "Shopify backend integration",
      "PWA capabilities",
      "API-first architecture",
      "Multi-channel support",
      "Advanced caching"
    ],
    technologies: ["Next.js", "Shopify Storefront API", "TypeScript", "Vercel", "Stripe", "Contentful"],
    image: "/hero-image.jpg",
    status: "Live",
    client: "Tech Startup",
    impact: "80% improvement in page load speed"
  },
  {
    id: 6,
    title: "Advanced Inventory Management",
    category: "Operations",
    description: "Comprehensive inventory management system with predictive analytics, automated reordering, and multi-location synchronization for complex supply chain operations.",
    features: [
      "Predictive inventory analytics",
      "Automated reordering",
      "Multi-location sync",
      "Supplier integration",
      "Demand forecasting",
      "Real-time reporting"
    ],
    technologies: ["Machine Learning", "Python", "Shopify API", "PostgreSQL", "Redis", "AWS"],
    image: "/services-image.jpg",
    status: "Live",
    client: "Wholesale Distributor",
    impact: "30% reduction in stockouts"
  }
]

const categories = [
  "All",
  "Product Management",
  "Analytics & Tracking",
  "Catalog Management",
  "Logistics & Fulfillment",
  "Architecture",
  "Operations"
]

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "99.9%", label: "Uptime" },
  { number: "200+", label: "Happy Clients" },
  { number: "24/7", label: "Support" }
]

export function WorkPage() {
  return (
    <Layout>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Our Work
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
                Explore our portfolio of innovative Shopify apps and solutions that have transformed businesses and driven measurable results.
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
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0 
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

        {/* Featured Project */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Featured Project
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  {projects[0].title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                      {projects[0].status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{projects[0].client}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChartBarIcon className="w-4 h-4" />
                    <span>{projects[0].impact}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projects[0].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${projects[0].id}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  prefetch={false}
                >
                  View Case Study
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(1).map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative aspect-[16/10] bg-muted/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight flex-1">
                      <Link href={`/work/${project.id}`} className="hover:underline line-clamp-2" prefetch={false}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                      {project.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Client:</span>
                        <span className="font-medium">{project.client}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Impact:</span>
                        <span className="font-medium text-green-500">{project.impact}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Our Expertise
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  End-to-End Shopify Solutions
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  From custom app development to complex integrations, we specialize in creating solutions that drive real business results and provide measurable ROI.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CubeIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Custom Shopify Apps</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GlobeAltIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Headless E-commerce</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChartBarIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Analytics & Tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Logistics & Fulfillment</span>
                  </div>
                </div>
                <Link
                  href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  prefetch={false}
                >
                  Start Your Project
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src="/services-image.jpg"
                  alt="Our Expertise"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Let&apos;s discuss your project and create a custom solution that drives real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  prefetch={false}
                >
                  Get a Quote
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
} 