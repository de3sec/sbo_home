"use client"

import { useState } from 'react'
import { newsletterApi } from '@/lib/api'
import { GDPRNotice } from './gdpr-notice'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!consent) {
      setError('Please provide consent to receive our newsletter')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await newsletterApi.subscribe({
        email,
        firstName: firstName || undefined,
        source: 'homepage',
        consent: true
      })
      setSuccess(true)
      setEmail('')
      setFirstName('')
      setConsent(false)
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for subscribing!</h3>
        <p className="text-green-700">
          You&apos;ll receive our latest updates and insights on Shopify development.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1 px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        
        <div className="flex items-center md:items-start gap-1 md:gap-3">
          <input
            type="checkbox"
            id="newsletter-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-primary focus:ring-2"
            required
          />
          <label htmlFor="newsletter-consent" className="text-sm text-muted-foreground">
            I consent to receive marketing communications from SBO Tech. I understand I can unsubscribe at any time.
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading || !consent}
          className="w-full inline-flex justify-center bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
        
        <GDPRNotice type="newsletter" />
      </form>
    </div>
  )
} 