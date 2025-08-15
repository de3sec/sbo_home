/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Layout } from "./shared/layout"
import IconCloud from "./magicui/icon-cloud"
import { IconCloudHome } from "./magicui/icon-cloud-home"
import { Suspense, SVGProps } from "react"
import { NewsletterSignup } from "./newsletter-signup"
import { PartnerLogoLoader } from "./partner-logo-loader"

export function HomePage() {
  return (
    <Layout>
        <section className="w-full py-12 flex justify-center items-center">
          <div className="container w-full px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Shopify Store with Expert App Development
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    SBO Tech is a premier Shopify app development agency specializing in custom e-commerce solutions, 
                    performance optimization, and seamless integrations. We help businesses in the US, Europe, and Australia 
                    achieve 25% higher conversion rates with our innovative Shopify apps and themes.
                  </p>

                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href="/contact"
                    className="cta inline-flex h-10 items-center justify-center btn-8bit bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Your Free Quote
                  </Link>
                  <Link
                    href="/work"
                  className="inline-flex h-10 items-center justify-center btn-8bit border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                    View Our Work
                  </Link>
                </div>
                <div className="grid gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-[#5ce65c]" />
                    <div className="text-sm font-medium">
                      Our Shopify apps and themes help increase conversion rates by 25% on average.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-[#5ce65c]" />
                    <div className="text-sm font-medium">
                      Clients who use our Shopify solutions see a 15% increase in average order value.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-[#5ce65c]" />
                    <div className="text-sm font-medium">
                      Our Shopify integrations help reduce cart abandonment by 12% on average.
                    </div>
                  </div>
                </div>
              </div>
              <Suspense fallback={<div className="relative mx-auto w-full max-w-[650px] aspect-video lg:order-last rounded-xl overflow-hidden bg-background"></div>}>
                <PartnerLogoLoader />
              </Suspense>
            </div>
          </div>
        </section>
        <section id="services" className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Shopify Development Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From custom app development to seamless integration and performance optimization, our expert team 
                  helps businesses across the US, Europe, and Australia unlock the full potential of their Shopify stores.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-[100mvw] items-center gap-2 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 text-center md:text-start">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-lg md:text-xl font-bold">Custom Shopify App Development</h3>
                      <p className="text-muted-foreground text-lg md:text-xl">
                        Tailor-made Shopify apps designed to streamline your business operations, automate workflows, 
                        and enhance customer experience. Our apps are built with scalability and performance in mind.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Shopify Integration & API Development</h3>
                      <p className="text-muted-foreground">
                        Seamlessly integrate your Shopify store with third-party tools, payment gateways, 
                        inventory management systems, and marketing platforms to create a unified e-commerce ecosystem.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Performance Optimization & Speed Enhancement</h3>
                      <p className="text-muted-foreground">
                        Improve your Shopify store's loading speed, Core Web Vitals, and overall user experience. 
                        Our optimization techniques can boost conversion rates by up to 25%.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center"><IconCloudHome /></div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Client Success Stories</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Leading E-commerce Brands</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how our Shopify development expertise has helped businesses across the US, Europe, 
                  and Australia achieve remarkable growth and operational efficiency.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Arushi - Aura Bloom Shop Founder" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Arushi</h4>
                      <p className="text-muted-foreground">Founder, Aura Bloom Shop</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;SBO Tech has been an invaluable partner in our Shopify journey. Their custom app development 
                    expertise and attention to detail have helped us streamline our operations and drive significant 
                    growth. Our conversion rates increased by 28% within the first quarter.&quot;
                  </p>
                </div>
              </Card>
              <Card className="p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Subhash - Widgets Inc. CMO" />
                      <AvatarFallback>SI</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Subhash</h4>
                      <p className="text-muted-foreground">CMO, Widgets Inc.</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Working with SBO Tech has been a game-changer for our business. Their Shopify app development 
                    expertise has helped us automate our workflows and provide a better experience for our customers. 
                    The performance optimization alone increased our page load speed by 40%."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Transform Your Shopify Store?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're in the US, Europe, or Australia, our Shopify development experts are here to help 
                you unlock the full potential of your online business. Get in touch to learn more about our 
                custom app development services and how we can drive your success.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row lg:justify-end">
              <Link
                href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                className="cta inline-flex h-10 items-center justify-center btn-8bit bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Your Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center btn-8bit border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup Section */}
        <section className="w-full py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Stay Updated with Shopify Development Insights
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Get the latest insights on Shopify development, app updates, e-commerce trends, and performance 
                optimization tips delivered to your inbox. Join thousands of e-commerce professionals worldwide.
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </section>
    </Layout>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function TrendingUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
