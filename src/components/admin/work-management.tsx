// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "@/components/ui/card"
// import { projectApi } from "@/lib/api"
// import { 
//   PlusIcon, 
//   PencilIcon, 
//   TrashIcon, 
//   EyeIcon,
//   CalendarIcon,
//   UsersIcon,
//   ChartBarIcon,
//   TagIcon,
//   CheckCircleIcon,
//   CodeBracketIcon
// } from "@heroicons/react/24/outline"

// interface Project {
//   _id: string
//   title: string
//   category: string
//   description: string
//   longDescription: string
//   features: string[]
//   technologies: string[]
//   image: string
//   status: 'live' | 'in-development' | 'completed' | 'archived'
//   client: string
//   impact: string
//   timeline: string
//   team: string
//   slug?: string
//   createdAt?: string
//   updatedAt?: string
// }

// const sampleProjects: Project[] = [
//   {
//     _id: "1",
//     title: "Custom Product Feed Generator",
//     category: "Product Management",
//     description: "Advanced product feed generation system that creates optimized feeds for Google Shopping, Facebook Ads, and other marketing platforms with real-time inventory updates and dynamic pricing.",
//     longDescription: `
//       <h2>Project Overview</h2>
//       <p>We developed a comprehensive product feed generation system for a major e-commerce retailer that needed to optimize their advertising campaigns across multiple platforms.</p>
      
//       <h2>Challenge</h2>
//       <p>The client was struggling with manual feed management across multiple advertising platforms, leading to inconsistent product data, delayed updates, and poor campaign performance.</p>
      
//       <h2>Solution</h2>
//       <p>We built a custom Shopify app that automatically generates optimized feeds for Google Shopping, Facebook Ads, and other platforms with real-time inventory updates and dynamic pricing.</p>
      
//       <h2>Results</h2>
//       <p>The implementation resulted in a 40% increase in ad conversion rates and a 60% reduction in manual feed management time.</p>
//     `,
//     features: [
//       "Real-time inventory synchronization",
//       "Dynamic pricing integration",
//       "Multi-platform feed generation",
//       "Advanced filtering and mapping",
//       "Automated feed updates",
//       "Performance analytics"
//     ],
//     technologies: ["Shopify API", "Node.js", "React", "PostgreSQL", "Redis"],
//     image: "/hero-image.jpg",
//     status: "live",
//     client: "E-commerce Retailer",
//     impact: "40% increase in ad conversion rates",
//     timeline: "3 months",
//     team: "4 developers, 1 designer, 1 project manager"
//   },
//   {
//     _id: "2",
//     title: "Server-Side Google Tracking",
//     category: "Analytics & Tracking",
//     description: "Headless server-side Google Analytics and Google Ads tracking solution that provides accurate conversion tracking without client-side dependencies, ensuring data integrity and compliance.",
//     longDescription: `
//       <h2>Project Overview</h2>
//       <p>We developed a server-side tracking solution for a multi-brand retailer that needed accurate conversion tracking while maintaining privacy compliance and avoiding ad blockers.</p>
      
//       <h2>Challenge</h2>
//       <p>The client was experiencing significant data loss due to ad blockers and privacy tools blocking client-side tracking scripts.</p>
      
//       <h2>Solution</h2>
//       <p>We implemented a comprehensive server-side tracking system using Google Analytics 4 and Google Ads API that processes all tracking events server-side.</p>
      
//       <h2>Results</h2>
//       <p>The server-side tracking implementation resulted in a 25% improvement in tracking accuracy and complete compliance with privacy regulations.</p>
//     `,
//     features: [
//       "Server-side event tracking",
//       "Enhanced e-commerce tracking",
//       "Cross-domain tracking",
//       "Privacy compliance (GDPR/CCPA)",
//       "Real-time data processing",
//       "Custom event mapping"
//     ],
//     technologies: ["Google Analytics 4", "Google Ads API", "Node.js", "Cloud Functions", "BigQuery"],
//     image: "/services-image.jpg",
//     status: "live",
//     client: "Multi-brand Retailer",
//     impact: "25% improvement in tracking accuracy",
//     timeline: "2 months",
//     team: "3 developers, 1 data analyst"
//   },
//   {
//     id: 3,
//     title: "Sub Collection Creator App",
//     category: "Catalog Management",
//     description: "Intelligent sub-collection management system that automatically creates and manages product collections based on tags, attributes, and custom rules, streamlining catalog organization.",
//     longDescription: `
//       <h2>Project Overview</h2>
//       <p>We developed an intelligent sub-collection management system for a fashion retailer that needed to streamline their catalog organization.</p>
      
//       <h2>Challenge</h2>
//       <p>The client was spending hours manually creating and managing product collections, leading to inconsistent organization and poor user experience.</p>
      
//       <h2>Solution</h2>
//       <p>We built an automated system that creates and manages product collections based on tags, attributes, and custom rules.</p>
      
//       <h2>Results</h2>
//       <p>The implementation resulted in a 60% reduction in manual catalog work and improved product discoverability.</p>
//     `,
//     features: [
//       "Automated collection creation",
//       "Smart tagging system",
//       "Bulk product management",
//       "Custom collection rules",
//       "SEO optimization",
//       "Performance monitoring"
//     ],
//     technologies: ["Shopify Liquid", "JavaScript", "GraphQL", "MongoDB", "AWS Lambda"],
//     image: "/hero-image.jpg",
//     status: "in-development",
//     client: "Fashion Retailer",
//     impact: "60% reduction in manual catalog work",
//     timeline: "4 months",
//     team: "3 developers, 1 designer"
//   }
// ]

// const categories = [
//   "Product Management",
//   "Analytics & Tracking",
//   "Catalog Management",
//   "Logistics & Fulfillment",
//   "Architecture",
//   "Operations"
// ]

// export function WorkManagement() {
//   const [projects, setProjects] = useState<Project[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState<string>("All")
//   const [selectedStatus, setSelectedStatus] = useState<string>("All")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//   const [editingProject, setEditingProject] = useState<Project | null>(null)

//   // Fetch projects on component mount
//   useEffect(() => {
//     fetchProjects()
//   }, [])

//   const fetchProjects = async () => {
//     try {
//       setLoading(true)
//       const params: any = {}
//       if (selectedCategory !== "All") params.category = selectedCategory
//       if (selectedStatus !== "All") params.status = selectedStatus
      
//       const response = await projectApi.getAll(params)
//       setProjects(response.data)
//       setError(null)
//     } catch (err) {
//       setError('Failed to fetch projects')
//       console.error('Error fetching projects:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Refetch when filters change
//   useEffect(() => {
//     fetchProjects()
//   }, [selectedCategory, selectedStatus])

//   const filteredProjects = projects.filter(project => {
//     const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
//     const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
//     const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          project.description.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesCategory && matchesStatus && matchesSearch
//   })

//   const handleDeleteProject = async (id: string) => {
//     if (confirm("Are you sure you want to delete this project?")) {
//       try {
//         await projectApi.delete(id)
//         setProjects(projects.filter(project => project._id !== id))
//       } catch (err) {
//         console.error('Error deleting project:', err)
//         alert('Failed to delete project')
//       }
//     }
//   }

//   const handleStatusChange = async (id: string, newStatus: 'live' | 'in-development' | 'completed' | 'archived') => {
//     try {
//       const project = projects.find(p => p._id === id)
//       if (!project) return
      
//       await projectApi.update(id, { ...project, status: newStatus })
//       setProjects(projects.map(project => 
//         project._id === id ? { ...project, status: newStatus } : project
//       ))
//     } catch (err) {
//       console.error('Error updating project status:', err)
//       alert('Failed to update project status')
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'live': return 'bg-green-500/10 text-green-500'
//       case 'in-development': return 'bg-blue-500/10 text-blue-500'
//       case 'completed': return 'bg-purple-500/10 text-purple-500'
//       case 'archived': return 'bg-gray-500/10 text-gray-500'
//       default: return 'bg-gray-500/10 text-gray-500'
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Work Projects Management</h2>
//           <p className="text-muted-foreground">Create, edit, and manage your portfolio projects</p>
//         </div>
//         <button 
//           onClick={() => setIsCreateModalOpen(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
//         >
//           <PlusIcon className="w-4 h-4" />
//           Add New Project
//         </button>
//       </div>

//       {/* Filters */}
//       <Card className="p-6">
//         <div className="grid gap-4 md:grid-cols-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Search</label>
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//             >
//               <option value="All">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//             >
//               <option value="All">All Status</option>
//               <option value="live">Live</option>
//               <option value="in-development">In Development</option>
//               <option value="completed">Completed</option>
//               <option value="archived">Archived</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm hover:bg-accent hover:text-accent-foreground">
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </Card>

//       {/* Projects Table */}
//       <Card className="p-6">
//         {loading && (
//           <div className="text-center py-8">
//             <p className="text-muted-foreground">Loading projects...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="text-center py-8">
//             <p className="text-red-500">{error}</p>
//             <button 
//               onClick={fetchProjects}
//               className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
//             >
//               Retry
//             </button>
//           </div>
//         )}
        
//         {!loading && !error && (
//           <div className="space-y-4">
//             {filteredProjects.map((project) => (
//             <div key={project.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
//               {/* Image */}
//               <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted/20 flex-shrink-0">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold line-clamp-1">{project.title}</h3>
//                     <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                    
//                     <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <TagIcon className="w-3 h-3" />
//                         <span>{project.category}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <UsersIcon className="w-3 h-3" />
//                         <span>{project.client}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <CalendarIcon className="w-3 h-3" />
//                         <span>{project.timeline}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <ChartBarIcon className="w-3 h-3" />
//                         <span>{project.impact}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-2 ml-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                       {project.status === 'in-development' ? 'In Development' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
//                     </span>
                    
//                                          <select
//                        value={project.status}
//                        onChange={(e) => handleStatusChange(project._id, e.target.value as 'live' | 'in-development' | 'completed' | 'archived')}
//                        className="px-2 py-1 rounded border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
//                      >
//                       <option value="in-development">In Development</option>
//                       <option value="live">Live</option>
//                       <option value="completed">Completed</option>
//                       <option value="archived">Archived</option>
//                     </select>

//                     <button 
//                       onClick={() => setEditingProject(project)}
//                       className="p-1 hover:bg-muted rounded transition-colors"
//                       title="Edit"
//                     >
//                       <PencilIcon className="w-4 h-4" />
//                     </button>
                    
//                                          <button 
//                        onClick={() => window.open(`/work/${project._id}`, '_blank')}
//                        className="p-1 hover:bg-muted rounded transition-colors"
//                        title="View"
//                      >
//                        <EyeIcon className="w-4 h-4" />
//                      </button>
                     
//                      <button 
//                        onClick={() => handleDeleteProject(project._id)}
//                        className="p-1 hover:bg-muted rounded transition-colors text-red-500 hover:text-red-600"
//                        title="Delete"
//                      >
//                        <TrashIcon className="w-4 h-4" />
//                      </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredProjects.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-muted-foreground">No projects found matching your criteria.</p>
//             </div>
//           )}
//         </div>
//         )}
//       </Card>

//       {/* Create/Edit Modal */}
//       {(isCreateModalOpen || editingProject) && (
//         <ProjectModal
//           project={editingProject}
//           onClose={() => {
//             setIsCreateModalOpen(false)
//             setEditingProject(null)
//           }}
//           onSave={async (project) => {
//             try {
//               if (editingProject) {
//                 await projectApi.update(editingProject._id, project)
//                 setProjects(projects.map(p => p._id === editingProject._id ? { ...project, _id: editingProject._id } : p))
//               } else {
//                 const response = await projectApi.create(project)
//                 setProjects([...projects, response.data])
//               }
//               setIsCreateModalOpen(false)
//               setEditingProject(null)
//             } catch (err) {
//               console.error('Error saving project:', err)
//               alert('Failed to save project')
//             }
//           }}
//         />
//       )}
//     </div>
//   )
// }

// interface ProjectModalProps {
//   project?: Project | null
//   onClose: () => void
//   onSave: (project: Project) => void
// }

// function ProjectModal({ project, onClose, onSave }: ProjectModalProps) {
//   const [formData, setFormData] = useState<Partial<Project>>(
//     project || {
//       title: "",
//       category: "",
//       description: "",
//       longDescription: "",
//       features: [],
//       technologies: [],
//       status: "in-development",
//       client: "",
//       impact: "",
//       timeline: "",
//       team: "",
//       image: "/hero-image.jpg"
//     }
//   )

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSave(formData as Project)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold">
//             {project ? "Edit Project" : "Create New Project"}
//           </h3>
//           <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Client</label>
//               <input
//                 type="text"
//                 value={formData.client}
//                 onChange={(e) => setFormData({ ...formData, client: e.target.value })}
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Timeline</label>
//               <input
//                 type="text"
//                 value={formData.timeline}
//                 onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
//                 placeholder="e.g., 3 months"
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Team</label>
//               <input
//                 type="text"
//                 value={formData.team}
//                 onChange={(e) => setFormData({ ...formData, team: e.target.value })}
//                 placeholder="e.g., 4 developers, 1 designer"
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Status</label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value as 'live' | 'in-development' | 'completed' | 'archived' })}
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               >
//                 <option value="in-development">In Development</option>
//                 <option value="live">Live</option>
//                 <option value="completed">Completed</option>
//                 <option value="archived">Archived</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows={3}
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Long Description (HTML)</label>
//             <textarea
//               value={formData.longDescription}
//               onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
//               rows={10}
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//               placeholder="<h2>Project Overview</h2><p>Description...</p>"
//               required
//             />
//           </div>

//           <div className="grid gap-6 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
//               <textarea
//                 value={formData.features?.join(", ")}
//                 onChange={(e) => setFormData({ ...formData, features: e.target.value.split(", ").filter(feature => feature.trim()) })}
//                 rows={4}
//                 placeholder="Feature 1, Feature 2, Feature 3"
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
//               <textarea
//                 value={formData.technologies?.join(", ")}
//                 onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(", ").filter(tech => tech.trim()) })}
//                 rows={4}
//                 placeholder="React, Node.js, PostgreSQL"
//                 className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Impact</label>
//             <input
//               type="text"
//               value={formData.impact}
//               onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
//               placeholder="e.g., 40% increase in conversion rates"
//               className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//               required
//             />
//           </div>

//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
//             >
//               {project ? "Update Project" : "Create Project"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// } 