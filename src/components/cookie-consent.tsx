"use client"

import { useState, useEffect } from 'react'
import { GDPRNotice } from './gdpr-notice'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">We use cookies</h3>
            <GDPRNotice type="general" className="text-sm" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm border border-input rounded-md hover:bg-muted transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 