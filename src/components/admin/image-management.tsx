"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { imageApi } from "@/lib/api"
import Image from "next/image"
import {
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  XMarkIcon,
  PhotoIcon,
  CheckIcon,
} from "@heroicons/react/24/outline"

interface Image {
  _id: string
  filename: string
  originalName: string
  mimetype: string
  size: number
  url: string
  path: string
  tags: string[]
  category: string
  alt: string
  description: string
  uploadedBy: string
  isPublic: boolean
  uploadedAt: string
  createdAt: string
  updatedAt: string
}

export function ImageManagement() {
  const [images, setImages] = useState<Image[]>([])
  const [filteredImages, setFilteredImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [sortBy, setSortBy] = useState<'createdAt' | 'originalName' | 'size'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Upload states
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Viewer states
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalImages, setTotalImages] = useState(0)

  useEffect(() => {
    fetchImages()
  }, [currentPage])

  useEffect(() => {
    applyFilters()
  }, [images, searchTerm, selectedTag, sortBy, sortOrder])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await imageApi.getAll({
        tag: selectedTag,
        page: currentPage,
        limit: 20
      })
      setImages(response.images)
      setTotalPages(response.pagination.pages)
      setTotalImages(response.pagination.total)
      setError(null)
    } catch (err) {
      console.error('Error fetching images:', err)
      setError('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...images]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(image => image.tags.includes(selectedTag))
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'originalName':
          aValue = a.originalName.toLowerCase()
          bValue = b.originalName.toLowerCase()
          break
        case 'size':
          aValue = a.size
          bValue = b.size
          break
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredImages(filtered)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleUpload(files[0])
    }
  }

  const handleUpload = async (file: File) => {
    try {
      setUploading(true)
      setUploadProgress(0)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('tags', '')
      formData.append('category', 'general')

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      console.log('Uploading file:', file.name, file.type, file.size)
      console.log('FormData contents:', {
        file: file.name,
        tags: '',
        category: 'general'
      })
      
      const response = await imageApi.upload(formData)
      console.log('Upload response:', response)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Add new image to the list
      setImages(prev => [response.image, ...prev])
      setShowUploadModal(false)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setTimeout(() => setUploadProgress(0), 1000)
    } catch (err: any) {
      console.error('Error uploading image:', err)
      alert(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      await imageApi.delete(id)
      setImages(prev => prev.filter(img => img._id !== id))
    } catch (err) {
      console.error('Error deleting image:', err)
      alert('Failed to delete image')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(text)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      alert('Failed to copy URL')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getUniqueTags = () => {
    const allTags = images.flatMap(img => img.tags)
    return Array.from(new Set(allTags)).sort()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Image Library</h2>
          <p className="text-muted-foreground">
            {filteredImages.length} of {totalImages} images
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Tags</option>
            {getUniqueTags().map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field as 'createdAt' | 'originalName' | 'size')
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="createdAt-desc">Latest Uploaded</option>
            <option value="createdAt-asc">Oldest Uploaded</option>
            <option value="originalName-asc">Name A-Z</option>
            <option value="originalName-desc">Name Z-A</option>
            <option value="size-desc">Largest First</option>
            <option value="size-asc">Smallest First</option>
          </select>
        </div>
      </Card>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <PhotoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No images found</p>
          </div>
        ) : (
          filteredImages.map((image) => (
            <Card key={image._id} className="group relative overflow-hidden">
              {/* Image */}
              <div className="aspect-square relative bg-muted">
                <Image
                  src={image.url}
                  alt={image.alt || image.originalName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  onError={() => {
                    // Fallback handled by Next.js Image component
                  }}
                  unoptimized={image.url.startsWith('/uploads/') || image.url.startsWith('/api/uploads/')}
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedImage(image)
                      setShowViewer(true)
                    }}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                    title="View"
                  >
                    <EyeIcon className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${image.url}`)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                    title="Copy URL"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded-md transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-3">
                <p className="text-sm font-medium truncate" title={image.originalName}>
                  {image.originalName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(image.size)}
                </p>
                {image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 bg-muted text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {image.tags.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-muted text-xs rounded">
                        +{image.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-input rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-input rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center">
                <PhotoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to select or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF, WebP up to 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Select File'}
                </button>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {uploadProgress}% uploaded
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {showViewer && selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setShowViewer(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-md transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            <div className="bg-background rounded-lg overflow-hidden">
                          <Image
              src={selectedImage.url}
              alt={selectedImage.alt || selectedImage.originalName}
              width={800}
              height={600}
              className="max-w-full max-h-[70vh] object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
            />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{selectedImage.originalName}</h3>
                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}${selectedImage.url}`)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    {copiedUrl === `${window.location.origin}${selectedImage.url}` ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <DocumentDuplicateIcon className="w-4 h-4" />
                        Copy URL
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p>{formatFileSize(selectedImage.size)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p>{selectedImage.mimetype}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p>{new Date(selectedImage.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">URL</p>
                    <p className="truncate font-mono text-xs">
                      {window.location.origin}{selectedImage.url}
                    </p>
                  </div>
                </div>

                {selectedImage.alt && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm">Alt Text</p>
                    <p className="text-sm">{selectedImage.alt}</p>
                  </div>
                )}

                {selectedImage.description && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm">Description</p>
                    <p className="text-sm">{selectedImage.description}</p>
                  </div>
                )}

                {selectedImage.tags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
          <button 
            onClick={fetchImages}
            className="mt-2 text-sm text-destructive hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
} 