"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { newsletterApi } from '@/lib/api'

interface NewsletterSubscriber {
  _id: string
  email: string
  firstName?: string
  lastName?: string
  subscribedAt: string
  isActive: boolean
  source?: string
}

export function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSubscribers()
  }, [selectedStatus])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const params: any = { limit: 100 }
      if (selectedStatus !== 'all') {
        params.status = selectedStatus
      }
      const response = await newsletterApi.getAll(params)
      setSubscribers(response.data.subscribers || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching subscribers:', err)
      setError('Failed to load subscribers')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (subscriberId: string, isActive: boolean) => {
    try {
      await newsletterApi.update(subscriberId, { isActive })
      setSubscribers(prev => 
        prev.map(sub => 
          sub._id === subscriberId ? { ...sub, isActive } : sub
        )
      )
    } catch (err) {
      console.error('Error updating subscriber:', err)
    }
  }

  const handleDelete = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    
    try {
      await newsletterApi.delete(subscriberId)
      setSubscribers(prev => prev.filter(sub => sub._id !== subscriberId))
    } catch (err) {
      console.error('Error deleting subscriber:', err)
    }
  }

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subscriber.firstName && subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (subscriber.lastName && subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const activeSubscribers = subscribers.filter(sub => sub.isActive).length
  const inactiveSubscribers = subscribers.filter(sub => !sub.isActive).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subscribers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchSubscribers}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Subscribers</p>
              <p className="text-3xl font-bold">{subscribers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-3xl font-bold text-green-600">{activeSubscribers}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inactive</p>
              <p className="text-3xl font-bold text-gray-600">{inactiveSubscribers}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
        >
          <option value="all">All Subscribers</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
        
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
        />
      </div>

      {/* Subscribers List */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Newsletter Subscribers</h3>
          
          {filteredSubscribers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No subscribers found.</p>
          ) : (
            <div className="space-y-4">
              {filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber._id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{subscriber.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {subscriber.firstName && subscriber.lastName
                            ? `${subscriber.firstName} ${subscriber.lastName}`
                            : subscriber.firstName || 'No name provided'}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        subscriber.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      {subscriber.source && ` • Source: ${subscriber.source}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(subscriber._id, !subscriber.isActive)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        subscriber.isActive
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {subscriber.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 