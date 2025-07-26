import { Header } from "./header"
import { Footer } from "./footer"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`flex flex-col min-h-[100dvh] ${className}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 