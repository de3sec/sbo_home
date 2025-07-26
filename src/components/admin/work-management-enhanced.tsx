"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { projectApi } from "@/lib/api"
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

interface Project {
  _id: string
  title: string
  category: string
  description: string
  longDescription: string
  features: string[]
  technologies: string[]
  image: string
  status: 'live' | 'in-development' | 'completed' | 'archived'
  client: string
  impact: string
  timeline: string
  team: string
  slug?: string
  createdAt: string
  updatedAt: string
}

// Add this interface for the form data
interface ProjectFormData {
  title: string
  category: string
  description: string
  longDescription: string
  features: string[]
  technologies: string[]
  image: string
  status: 'live' | 'in-development' | 'completed' | 'archived'
  client: string
  impact: string
  timeline: string
  team: string
}

const categories = ['All', 'Product Management', 'Analytics & Tracking', 'Catalog Management', 'Logistics & Fulfillment', 'Architecture', 'Operations']
const statuses = ['All', 'live', 'in-development', 'completed', 'archived']

export function WorkManagementEnhanced() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sortBy, setSortBy] = useState<'updatedAt' | 'createdAt' | 'title'>('updatedAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [projects, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectApi.getAll()
      setProjects(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...projects]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Status filter
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project => project.status === selectedStatus)
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = sortBy === 'title' ? a[sortBy] : new Date(a[sortBy]).getTime()
      const bValue = sortBy === 'title' ? b[sortBy] : new Date(b[sortBy]).getTime()
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredProjects(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await projectApi.delete(id)
      setProjects(prev => prev.filter(project => project._id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
      alert('Failed to delete project')
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'live' | 'in-development' | 'completed' | 'archived') => {
    try {
      const project = projects.find(p => p._id === id)
      if (!project) return

      await projectApi.update(id, { ...project, status: newStatus })
      setProjects(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p))
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Failed to update status')
    }
  }

  const handleSaveProject = async (projectData: ProjectFormData) => {
    try {
      if (editingProject) {
        // Update existing project
        await projectApi.update(editingProject._id, projectData)
      } else {
        // Create new project
        await projectApi.create(projectData)
      }
      fetchProjects()
    } catch (err: any) {
      throw new Error(err.message || 'Failed to save project')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-purple-500" />
      case 'in-development':
        return <ClockIcon className="w-4 h-4 text-blue-500" />
      case 'archived':
        return <XCircleIcon className="w-4 h-4 text-gray-500" />
      default:
        return <ClockIcon className="w-4 h-4 text-blue-500" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'completed':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'in-development':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get counts for each status
  const statusCounts = {
    all: projects.length,
    live: projects.filter(p => p.status === 'live').length,
    inDevelopment: projects.filter(p => p.status === 'in-development').length,
    completed: projects.filter(p => p.status === 'completed').length,
    archived: projects.filter(p => p.status === 'archived').length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{statusCounts.all}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{statusCounts.live}</p>
            <p className="text-sm text-muted-foreground">Live</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{statusCounts.inDevelopment}</p>
            <p className="text-sm text-muted-foreground">In Development</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{statusCounts.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{statusCounts.archived}</p>
            <p className="text-sm text-muted-foreground">Archived</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'All Status' : status === 'in-development' ? 'In Development' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field as 'updatedAt' | 'createdAt' | 'title')
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="updatedAt-desc">Latest Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
            <option value="createdAt-desc">Latest Created</option>
            <option value="createdAt-asc">Oldest Created</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No projects found matching your filters.</p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project._id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(project.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(project.status)}`}
                    >
                      {project.status === 'in-development' ? 'In Development' : project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>Client: {project.client}</span>
                    <span>Timeline: {project.timeline}</span>
                    <span>Team: {project.team}</span>
                    <span>Updated {formatDate(project.updatedAt)}</span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-muted text-xs rounded-md">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Impact */}
                  <p className="text-sm text-green-600 font-medium">{project.impact}</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    {/* Status Change Buttons */}
                    {project.status !== 'live' && (
                      <button
                        onClick={() => handleStatusChange(project._id, 'live')}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Mark as Live"
                      >
                        <PlayIcon className="w-4 h-4" />
                      </button>
                    )}
                    {project.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange(project._id, 'completed')}
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        title="Mark as Completed"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                    )}
                    {project.status !== 'in-development' && (
                      <button
                        onClick={() => handleStatusChange(project._id, 'in-development')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Move to Development"
                      >
                        <ClockIcon className="w-4 h-4" />
                      </button>
                    )}
                    {project.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(project._id, 'archived')}
                        className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="Archive"
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Main Actions */}
                  <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
                    <button
                      onClick={() => {
                        setEditingProject(project)
                        setShowEditModal(true)
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-2 text-sm text-destructive hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Modals would go here - CreateProjectModal, EditProjectModal */}
      {/* For now, these are placeholders */}
      {showCreateModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowCreateModal(false)
            setEditingProject(null)
          }}
          onSave={handleSaveProject}
        />
      )}

      {showEditModal && editingProject && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowEditModal(false)
            setEditingProject(null)
          }}
          onSave={handleSaveProject}
        />
      )}
    </div>
  )
} 

interface ProjectModalProps {
  project?: Project | null
  onClose: () => void
  onSave: (project: ProjectFormData) => void
}

function ProjectModal({ project, onClose, onSave }: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    category: project?.category || 'Product Management',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    features: project?.features || [],
    technologies: project?.technologies || [],
    image: project?.image || '/hero-image.jpg',
    status: project?.status || 'in-development',
    client: project?.client || '',
    impact: project?.impact || '',
    timeline: project?.timeline || '',
    team: project?.team || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newTechnology, setNewTechnology] = useState('')

  const categories = ['Product Management', 'Analytics & Tracking', 'Catalog Management', 'Logistics & Fulfillment', 'Architecture', 'Operations']
  const statuses = ['live', 'in-development', 'completed', 'archived']

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const handleRemoveFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }))
  }

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology('')
    }
  }

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await onSave(formData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Long Description *</label>
            <textarea
              value={formData.longDescription}
              onChange={(e) => handleChange('longDescription', e.target.value)}
              required
              rows={8}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Project Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Client *</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleChange('client', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timeline *</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => handleChange('timeline', e.target.value)}
                  required
                  placeholder="e.g., 3 months"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team Size *</label>
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => handleChange('team', e.target.value)}
                  required
                  placeholder="e.g., 4 developers"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Impact *</label>
                <input
                  type="text"
                  value={formData.impact}
                  onChange={(e) => handleChange('impact', e.target.value)}
                  required
                  placeholder="e.g., 40% increase in conversion"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Status and Image */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'in-development' ? 'In Development' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <span className="flex-1 text-sm">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology"
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-input bg-background text-foreground rounded-md hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 