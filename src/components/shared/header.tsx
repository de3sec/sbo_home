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
        <Link href="/" className="flex items-center justify-center p-4" prefetch={false}>
        <svg
  width="50"
  height="50"
  viewBox="0 0 60 60"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="currentColor"
  stroke-width="2.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>

  <polygon points="32,8 12,16 32,24 52,16" />
  
  <polygon points="12,16 12,40 32,48 32,24" />

  <polygon points="52,16 52,40 32,48 32,24" />

 
  <g filter="url(#bagShadow)" stroke="currentColor" stroke-width="2">

    <path d="M27,28 L37,28 L39,38 L25,38 Z" fill="none"/>
    
    <path d="M29,28 C29,24 31,24 31,28" fill="none"/>
    <path d="M33,28 C33,24 35,24 35,28" fill="none"/>
  </g>

  <defs>
    <filter id="bagShadow" x="20" y="20" width="24" height="24" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
</svg>
          <span className="text-xl font-bold">SBOᵗᵉᶜʰ</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              isActive("/") ? "underline" : ""
            }`} 
            prefetch={false}
          >
            Home
          </Link>
          <Link 
            href="/blogs" 
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              isActive("/blogs") ? "underline" : ""
            }`} 
            prefetch={false}
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              isActive("/about") ? "underline" : ""
            }`} 
            prefetch={false}
          >
            About
          </Link>
          <Link 
            href="/work" 
            className={`text-sm font-medium hover:underline underline-offset-4 ${
              isActive("/work") ? "underline" : ""
            }`} 
            prefetch={false}
          >
            Work
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium hover:underline underline-offset-4" 
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