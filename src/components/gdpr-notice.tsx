"use client"

import { useState } from 'react'
import Link from 'next/link'

interface GDPRNoticeProps {
  type: 'newsletter' | 'contact' | 'general'
  className?: string
}

export function GDPRNotice({ type, className = "" }: GDPRNoticeProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getNoticeText = () => {
    switch (type) {
      case 'newsletter':
        return "By subscribing to our newsletter, you agree to receive marketing communications from SBO Tech. You can unsubscribe at any time. We respect your privacy and will never share your information with third parties."
      case 'contact':
        return "By submitting this form, you consent to SBO Tech processing your personal data to respond to your inquiry. Your data will be stored securely and used only for the purpose of responding to your message."
      case 'general':
        return "This website uses cookies and similar technologies to provide you with the best experience. By continuing to use this site, you consent to our use of cookies."
      default:
        return ""
    }
  }

  const getPrivacyLink = () => {
    return (
      <Link 
        href="/privacy" 
        className="text-muted-foreground border-b border-muted-foreground hover:underline"
        prefetch={false}
      >
        Privacy Policy
      </Link>
    )
  }

  return (
    <div className={`text-xs text-muted-foreground ${className}`}>
      <p className="mb-2">
        {getNoticeText()}
      </p>
      <div className="flex items-center gap-2">
        <span>For more information, see our</span>
        {getPrivacyLink()}
        {type !== 'general' && (
          <>
            <span>and</span>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-muted-foreground border-b border-muted-foreground hover:underline"
            >
              Data Processing Details
            </button>
          </>
        )}
      </div>
      
      {showDetails && type !== 'general' && (
        <div className="mt-3 p-3 bg-muted rounded-md text-xs">
          <h4 className="font-medium mb-2">Data Processing Details:</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• <strong>Data Controller:</strong> SBO Tech</li>
            <li>• <strong>Purpose:</strong> {type === 'newsletter' ? 'Newsletter distribution and marketing communications' : 'Customer support and inquiry handling'}</li>
            <li>• <strong>Legal Basis:</strong> Consent (Article 6(1)(a) GDPR)</li>
            <li>• <strong>Retention Period:</strong> {type === 'newsletter' ? 'Until you unsubscribe' : '2 years after last contact'}</li>
            <li>• <strong>Your Rights:</strong> Access, rectification, erasure, portability, and objection</li>
            <li>• <strong>Contact:</strong> hello@devs.sbotech.in for data requests</li>
          </ul>
        </div>
      )}
    </div>
  )
} 