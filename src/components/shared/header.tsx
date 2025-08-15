"use client"

import Link from "next/link"
import Image from "next/image"
import SBOLogo from "../../assets/SBO_Logo.svg"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface HeaderProps {
  className?: string
}

export function Header({ className = "" }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`px-4 lg:px-6 h-14 flex items-center border-b border-border ${className}`}>
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex flex-col justify-center align-middle items-center p-2 font-logo my-1" prefetch={false}>
          <p className="text-xl font-bold leading-none">SBO</p>
          <p className="text-xs font-bold">tech</p>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 sm:gap-6 font-logo">
          <Link 
            href="/" 
            className={`text-xs font-medium hover:underline underline-offset-4 ${
              isActive("/") ? "bg-primary text-primary-foreground p-2" : "bg-transparent p-2"
            }`} 
            prefetch={false}
          >
            Home
          </Link>
          <Link 
            href="/blogs" 
            className={`text-xs font-medium hover:underline underline-offset-4 ${
              isActive("/blogs") ? "bg-primary text-primary-foreground p-2" : "bg-transparent p-2"
            }`} 
            prefetch={false}
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className={`text-xs font-medium hover:underline underline-offset-4 ${
              isActive("/about") ? "bg-primary text-primary-foreground p-2" : "bg-transparent p-2"
            }`} 
            prefetch={false}
          >
            About
          </Link>
          <Link 
            href="/work" 
            className={`text-xs font-medium hover:underline underline-offset-4 ${
              isActive("/work") ? "bg-primary text-primary-foreground p-2" : "bg-transparent p-2"
            }`} 
            prefetch={false}
          >
            Work
          </Link>
          <Link 
            href="/contact" 
            className={`text-xs font-medium hover:underline underline-offset-4 ${
              isActive("/contact") ? "bg-primary text-primary-foreground p-2" : "bg-transparent p-2"
            }`} 
            prefetch={false}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-b border-border z-50">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              href="/" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                isActive("/") ? "underline" : ""
              }`} 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/blogs" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                isActive("/blogs") ? "underline" : ""
              }`} 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                isActive("/about") ? "underline" : ""
              }`} 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/work" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                isActive("/work") ? "underline" : ""
              }`} 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium hover:underline underline-offset-4" 
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
} 