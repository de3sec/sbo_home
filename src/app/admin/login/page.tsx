"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { Layout } from '@/components/shared/layout'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        router.push('/admin')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          
        </Card>
      </div>
    </Layout>
  )
} 