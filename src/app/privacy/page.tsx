import { Metadata } from 'next'
import { Layout } from '@/components/shared/layout'

export const metadata: Metadata = {
  title: "Privacy Policy - SBO Tech | Data Protection & Privacy Information",
  description: "SBO Tech's privacy policy outlining how we collect, use, and protect your personal data. Learn about your GDPR rights and our data protection practices.",
  keywords: [
    "SBO Tech privacy policy",
    "data protection",
    "GDPR compliance",
    "privacy rights",
    "data security",
    "personal information protection"
  ],
  openGraph: {
    title: "Privacy Policy - SBO Tech",
    description: "SBO Tech's privacy policy outlining how we collect, use, and protect your personal data.",
    url: "https://sbotech.in/privacy",
    siteName: "SBO Tech",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - SBO Tech",
    description: "SBO Tech's privacy policy outlining how we collect, use, and protect your personal data.",
  },
  alternates: {
    canonical: "https://sbotech.in/privacy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>
            SBO Tech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us, including:</p>
          <ul>
            <li>Name and email address (for newsletter subscriptions)</li>
            <li>Contact information (for support inquiries)</li>
            <li>Message content (for contact form submissions)</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>We may automatically collect certain information when you visit our website, including:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website information</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Send newsletter communications (with your consent)</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>Under the General Data Protection Regulation (GDPR), we process your personal data based on the following legal grounds:</p>
          <ul>
            <li><strong>Consent:</strong> For newsletter subscriptions and marketing communications</li>
            <li><strong>Legitimate Interest:</strong> For website analytics and service improvement</li>
            <li><strong>Contract Performance:</strong> For responding to your inquiries and providing support</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy:</p>
          <ul>
            <li><strong>Newsletter subscribers:</strong> Until you unsubscribe or request deletion</li>
            <li><strong>Contact messages:</strong> 2 years after last contact</li>
            <li><strong>Website analytics:</strong> 26 months</li>
          </ul>

          <h2>6. Your Rights (GDPR)</h2>
          <p>Under GDPR, you have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right of Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right of Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to processing of your data</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>

          <h2>7. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

          <h2>8. Third-Party Services</h2>
          <p>We may use third-party services that collect, monitor, and analyze data. These services have their own privacy policies.</p>

          <h2>9. Cookies</h2>
          <p>We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>

          <h2>10. International Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>

          <h2>11. Children&apos;s Privacy</h2>
          <p>Our services are not intended for children under 16. We do not knowingly collect personal information from children under 16.</p>

          <h2>12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>13. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> hello@devs.sbotech.in</li>
            <li><strong>Address:</strong> Remote-first team</li>
          </ul>

          <h2>14. Data Protection Officer</h2>
          <p>For GDPR-related inquiries, you can contact our Data Protection Officer at hello@devs.sbotech.in</p>
        </div>
      </div>
    </Layout>
  )
}