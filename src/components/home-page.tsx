/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import PartnerLogo from "../assets/partnerslogo.svg"
import SBOLogo from "../assets/SBO_Logo.svg"
import IconCloud from "./magicui/icon-cloud"
import { IconCloudHome } from "./magicui/icon-cloud-home"
import { SVGProps } from "react"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center p-4" prefetch={false}>
          <Image className="mt-4" height={60} width={60} alt="logo" src={SBOLogo}></Image>
          <span className="pt-2">SBO Tech</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Services
          </Link>
          {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Work
        </Link> */}
          <Link href="https://smallboxoffice.com" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 flex justify-center items-center">
          <div className="container w-full px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unleash the Power of Shopify with SBO Tech
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We are a leading Shopify app development agency, dedicated to helping businesses thrive in the
                    digital landscape. Let us create custom solutions that drive your success.
                  </p>

                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                    className="cta inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get a Quote
                  </Link>
                  {/* <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link> */}
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
              <Image
                src={PartnerLogo}
                width="650"
                height="650"
                alt="Hero"
                className="mx-auto aspect-video fill-foreground overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="services" className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Elevate Your Shopify Experience</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From custom app development to seamless integration, our experts are here to help you unlock the full
                  potential of Shopify.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-[100mvw] items-center gap-2 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 text-center md:text-start">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-lg md:text-xl font-bold">Custom App Development</h3>
                      <p className="text-muted-foreground text-lg md:text-xl">
                        Tailor-made Shopify apps to streamline your business operations.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Shopify Integration</h3>
                      <p className="text-muted-foreground">
                        Seamlessly integrate your Shopify store with third-party tools and services.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Performance Optimization</h3>
                      <p className="text-muted-foreground">
                        Improve your Shopify store's speed, reliability, and user experience.
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Client Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from the businesses we've helped succeed with Shopify.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Arushi</h4>
                      <p className="text-muted-foreground">Founder, Aura Bloom Shop</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;SBO Tech has been an invaluable partner in our Shopify\n journey. Their expertise and attention to
                    detail have\n helped us streamline our operations and drive\n significant growth.&quot;
                  </p>
                </div>
              </Card>
              <Card className="p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">Subhash</h4>
                      <p className="text-muted-foreground">CMO, Widgets Inc.</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Working with SBO Tech has been a game-changer for our\n business. Their Shopify app development
                    expertise has\n helped us automate our workflows and provide a better\n experience for our
                    customers."
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
                Ready to Elevate Your Shopify Store?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let our Shopify experts help you unlock the full potential of your online business. Get in touch to
                learn more about our services and how we can help you succeed.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                className="cta inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get a Quote
              </Link>
              <Link
                href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Us
              </Link>
            </div>
          </div>


        </section>
        <div className="w-full flex justify-center items-center pb-20 bg-muted">
          <a
            href="https://demo-formbricks-app.tfnfm9.easypanel.host/s/clzhfydg5000k5rpsirzn6dbk"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              backgroundColor: 'rgb(250,251,252)',
              borderColor: 'rgb(224,227,232)',
              borderRadius: '8px',
              marginLeft: '0px',
              marginRight: '0px',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              display: 'block',
              overflow: 'auto',
              borderWidth: '1px',
              borderStyle: 'solid',
              padding: '2rem',
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
            }}
            target="_blank"
          >
            <p style={{ fontSize: '1rem', lineHeight: '1.5rem', margin: '0px', color: 'rgb(65,75,90)', marginRight: '2rem', display: 'block', padding: '0px', fontWeight: 600 }}>
              Enter your details below to get in touch
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.5rem', margin: '0px', color: 'rgb(65,75,90)', display: 'block', padding: '0px', fontWeight: 400 }}></p>
            <table
              align="center"
              width="100%"
              border={0}
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{
                borderColor: 'rgb(193,199,209)',
                borderRadius: '8px',
                marginTop: '1rem',
                display: 'block',
                height: '5rem',
                width: '100%',
                borderWidth: '1px',
                borderStyle: 'solid',
                backgroundColor: 'rgb(248,250,252)'
              }}
            >
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border={0}
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
              style={{
                maxWidth: '37.5em',
                margin: 'auto',
                marginTop: '2rem',
                textAlign: 'center'
              }}
            >
              <tbody>
                <tr style={{ width: '100%' }}>
                  <td>
                    <a
                      href="https://formbricks.com/"
                      style={{ color: 'rgb(103,111,123)', textDecoration: 'none', fontSize: '0.75rem', lineHeight: '1rem' }}
                      target="_blank"
                    >
                      Powered by Formbricks
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </a>

        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 SBO Tech. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms-of-service" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
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
