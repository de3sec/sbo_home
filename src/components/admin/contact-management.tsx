"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { contactApi } from '@/lib/api'

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
  status: 'new' | 'read' | 'replied' | 'archived'
  ipAddress?: string
  userAgent?: string
}

export function ContactManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedReadStatus, setSelectedReadStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [selectedStatus, selectedReadStatus])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const params: any = { limit: 100 }
      if (selectedStatus !== 'all') {
        params.status = selectedStatus
      }
      if (selectedReadStatus !== 'all') {
        params.isRead = selectedReadStatus === 'read'
      }
      const response = await contactApi.getAll(params)
      setMessages(response.data.messages || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (messageId: string, status: string) => {
    try {
      await contactApi.update(messageId, { status })
      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId ? { ...msg, status: status as any } : msg
        )
      )
    } catch (err) {
      console.error('Error updating message:', err)
    }
  }

  const handleReadToggle = async (messageId: string, isRead: boolean) => {
    try {
      await contactApi.update(messageId, { isRead })
      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId ? { ...msg, isRead } : msg
        )
      )
    } catch (err) {
      console.error('Error updating message:', err)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      await contactApi.delete(messageId)
      setMessages(prev => prev.filter(msg => msg._id !== messageId))
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const newMessages = messages.filter(msg => msg.status === 'new').length
  const readMessages = messages.filter(msg => msg.isRead).length
  const unreadMessages = messages.filter(msg => !msg.isRead).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-gray-100 text-gray-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchMessages}
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
              <p className="text-3xl font-bold">{messages.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New</p>
              <p className="text-3xl font-bold text-blue-600">{newMessages}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Read</p>
              <p className="text-3xl font-bold text-green-600">{readMessages}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unread</p>
              <p className="text-3xl font-bold text-orange-600">{unreadMessages}</p>
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
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
        
        <select
          value={selectedReadStatus}
          onChange={(e) => setSelectedReadStatus(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
        >
          <option value="all">All Messages</option>
          <option value="read">Read Only</option>
          <option value="unread">Unread Only</option>
        </select>
        
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Messages List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Messages</h3>
            
            {filteredMessages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No messages found.</p>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 border border-border rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?._id === message._id 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted'
                    } ${!message.isRead ? 'bg-blue-50 border-blue-200' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{message.name}</p>
                          {!message.isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                        <p className="font-medium text-sm">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Message Detail */}
        {selectedMessage && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Received</label>
                  <p className="text-sm">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
                
                {selectedMessage.ipAddress && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">IP Address</label>
                    <p className="text-sm font-mono">{selectedMessage.ipAddress}</p>
                  </div>
                )}
                
                <div className="flex items-center gap-4 pt-4 border-t">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  
                  <button
                    onClick={() => handleReadToggle(selectedMessage._id, !selectedMessage.isRead)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedMessage.isRead
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
} 