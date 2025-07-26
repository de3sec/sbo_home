import { Metadata } from 'next'
import { ProtectedAdminPanel } from '@/components/admin/ProtectedAdminPanel'

export const metadata: Metadata = {
  title: "Admin Panel - SBO Tech",
  description: "Admin panel for managing blog posts and work content.",
}

export default function AdminPage() {
  return <ProtectedAdminPanel />
} 