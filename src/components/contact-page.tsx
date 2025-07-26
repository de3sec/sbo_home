"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Layout } from './shared/layout'
import { contactApi } from '@/lib/api'
import { GDPRNotice } from './gdpr-notice'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!consent) {
      setError('Please provide consent to process your data')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await contactApi.send({
        ...formData,
        consent: true
      })
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setConsent(false)
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Ready to elevate your Shopify store? Get in touch with our team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">hello@devs.sbotech.in</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Remote-first team</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Why Choose SBO Tech?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Custom Shopify app development tailored to your business needs
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Expert integration services for seamless operations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">
                    Performance optimization to boost your store&apos;s success
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="contact-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-primary focus:ring-2"
                  required
                />
                <label htmlFor="contact-consent" className="text-sm text-muted-foreground">
                  I consent to SBO Tech processing my personal data to respond to my inquiry.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              
              <GDPRNotice type="contact" />
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
} 