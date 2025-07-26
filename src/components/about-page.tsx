import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Layout } from "./shared/layout"
import { 
  UsersIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon, 
  LightBulbIcon,
  ChartBarIcon,
  CogIcon
} from "@heroicons/react/24/outline"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    avatar: "/placeholder-avatar.svg",
    bio: "Full-stack developer with 8+ years of experience in Shopify app development and e-commerce solutions.",
    expertise: ["Shopify Apps", "React", "Node.js", "API Development"]
  },
  {
    name: "Alex Rodriguez",
    role: "AI Specialist",
    avatar: "/placeholder-avatar.svg",
    bio: "AI and machine learning expert focused on creating intelligent e-commerce solutions and automation.",
    expertise: ["Machine Learning", "AI Integration", "Data Analytics", "Automation"]
  },
  {
    name: "Mike Johnson",
    role: "Senior Developer",
    avatar: "/placeholder-avatar.svg",
    bio: "Experienced developer specializing in performance optimization and scalable architecture.",
    expertise: ["Performance", "Scalability", "DevOps", "System Architecture"]
  },
  {
    name: "Emily Watson",
    role: "Business Analyst",
    avatar: "/placeholder-avatar.svg",
    bio: "Business strategist helping clients optimize their e-commerce operations and growth strategies.",
    expertise: ["Business Strategy", "E-commerce", "Analytics", "Growth"]
  }
]

const values = [
  {
    icon: RocketLaunchIcon,
    title: "Innovation",
    description: "We stay ahead of the curve with cutting-edge technologies and creative solutions that drive business growth."
  },
  {
    icon: ShieldCheckIcon,
    title: "Reliability",
    description: "Our solutions are built with security and stability in mind, ensuring your business runs smoothly 24/7."
  },
  {
    icon: UsersIcon,
    title: "Collaboration",
    description: "We work closely with our clients to understand their unique needs and deliver tailored solutions."
  },
  {
    icon: LightBulbIcon,
    title: "Excellence",
    description: "We maintain the highest standards of quality in every project, from concept to deployment."
  }
]

const stats = [
  { number: "50+", label: "Apps Developed" },
  { number: "200+", label: "Happy Clients" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" }
]

export function AboutPage() {
  return (
    <Layout>
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                About SBO Tech
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
                We are a passionate team of developers, designers, and strategists dedicated to helping businesses succeed in the digital world through innovative Shopify solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  Empowering Businesses Through Technology
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  At SBO Tech, we believe that every business deserves access to world-class technology solutions. Our mission is to democratize e-commerce success by providing innovative, scalable, and user-friendly Shopify applications that drive real business results.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We combine deep technical expertise with a deep understanding of business needs to create solutions that don&apos;t just work—they transform how businesses operate and grow.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src="/hero-image.jpg"
                  alt="SBO Tech Mission"
                  fill
                  className="object-cover"
                />
              </div>
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

        {/* Values Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                Our Values
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground text-lg">
                The principles that guide everything we do and every solution we create.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                Meet Our Team
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground text-lg">
                The talented individuals behind every successful project and satisfied client.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 space-y-4">
                  <div className="text-center space-y-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-lg">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-block rounded-full bg-muted px-2 py-1 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  What We Do
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl leading-tight">
                  Comprehensive Shopify Solutions
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  From custom app development to performance optimization, we provide end-to-end solutions that help your Shopify store reach its full potential.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CogIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Custom App Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChartBarIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Performance Optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Security & Compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RocketLaunchIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">Integration Services</span>
                  </div>
                </div>
                <Link
                  href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                <Image
                  src="/services-image.jpg"
                  alt="Our Services"
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Let&apos;s discuss how SBO Tech can help you achieve your e-commerce goals with custom Shopify solutions.
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
                  href="/blogs"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  prefetch={false}
                >
                  Read Our Blog
                </Link>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
} 