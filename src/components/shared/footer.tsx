import Link from "next/link"

interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`py-6 w-full shrink-0 border-t ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">&copy; 2025 SBO Tech. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms-of-service" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 