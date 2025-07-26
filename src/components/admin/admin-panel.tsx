// "use client"

// import { useState } from "react"
// import { Layout } from "../shared/layout"
// import { Card } from "@/components/ui/card"
// import { BlogManagement } from "./blog-management"
// import { WorkManagement } from "./work-management"
// import { 
//   DocumentTextIcon, 
//   BriefcaseIcon, 
//   ChartBarIcon,
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
//   EyeIcon
// } from "@heroicons/react/24/outline"

// type AdminSection = 'dashboard' | 'blogs' | 'work' | 'analytics'

// export function AdminPanel() {
//   const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')

//   const stats = [
//     { title: "Total Blog Posts", value: "12", icon: DocumentTextIcon, color: "text-blue-500" },
//     { title: "Total Projects", value: "6", icon: BriefcaseIcon, color: "text-green-500" },
//     { title: "Published Posts", value: "10", icon: EyeIcon, color: "text-purple-500" },
//     { title: "Draft Posts", value: "2", icon: PencilIcon, color: "text-orange-500" }
//   ]

//   const recentBlogs = [
//     { id: 1, title: "10 Essential Shopify App Development Best Practices for 2025", status: "Published", date: "2025-01-15" },
//     { id: 2, title: "How to Optimize Your Shopify Store for Maximum Performance", status: "Published", date: "2025-01-12" },
//     { id: 3, title: "The Future of E-commerce: AI-Powered Shopify Solutions", status: "Draft", date: "2025-01-10" }
//   ]

//   const recentProjects = [
//     { id: 1, title: "Custom Product Feed Generator", status: "Live", date: "2025-01-10" },
//     { id: 2, title: "Server-Side Google Tracking", status: "Live", date: "2025-01-08" },
//     { id: 3, title: "Sub Collection Creator App", status: "In Development", date: "2025-01-05" }
//   ]

//   return (
//     <Layout>
//       {/* Admin Header */}
//       <section className="w-full py-6 border-b border-border bg-muted/20">
//         <div className="container mx-auto px-4 md:px-6 max-w-7xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold">Admin Panel</h1>
//               <p className="text-muted-foreground">Manage your blog posts and work content</p>
//             </div>
//             <div className="flex gap-2">
//               <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
//                 <PlusIcon className="w-4 h-4" />
//                 New Blog Post
//               </button>
//               <button className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
//                 <PlusIcon className="w-4 h-4" />
//                 New Project
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Navigation */}
//       <section className="w-full py-4 border-b border-border">
//         <div className="container mx-auto px-4 md:px-6 max-w-7xl">
//           <nav className="flex gap-6">
//             {[
//               { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
//               { id: 'blogs', label: 'Blog Posts', icon: DocumentTextIcon },
//               { id: 'work', label: 'Work Projects', icon: BriefcaseIcon },
//               { id: 'analytics', label: 'Analytics', icon: ChartBarIcon }
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id as AdminSection)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                   activeSection === item.id
//                     ? 'bg-primary text-primary-foreground'
//                     : 'hover:bg-muted text-muted-foreground hover:text-foreground'
//                 }`}
//               >
//                 <item.icon className="w-4 h-4" />
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </section>

//       {/* Content Area */}
//       <section className="w-full py-8">
//         <div className="container mx-auto px-4 md:px-6 max-w-7xl">
//           {activeSection === 'dashboard' && (
//             <div className="space-y-8">
//               {/* Stats Grid */}
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 {stats.map((stat, index) => (
//                   <Card key={index} className="p-6">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
//                         <stat.icon className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">{stat.value}</p>
//                         <p className="text-sm text-muted-foreground">{stat.title}</p>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>

//               {/* Recent Content */}
//               <div className="grid gap-8 lg:grid-cols-2">
//                 {/* Recent Blog Posts */}
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold">Recent Blog Posts</h3>
//                     <button className="text-sm text-primary hover:underline">View All</button>
//                   </div>
//                   <div className="space-y-4">
//                     {recentBlogs.map((blog) => (
//                       <div key={blog.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
//                         <div className="flex-1">
//                           <h4 className="font-medium line-clamp-1">{blog.title}</h4>
//                           <p className="text-sm text-muted-foreground">{blog.date}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             blog.status === 'Published' 
//                               ? 'bg-green-500/10 text-green-500' 
//                               : 'bg-orange-500/10 text-orange-500'
//                           }`}>
//                             {blog.status}
//                           </span>
//                           <button className="p-1 hover:bg-muted rounded">
//                             <PencilIcon className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>

//                 {/* Recent Projects */}
//                 <Card className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold">Recent Projects</h3>
//                     <button className="text-sm text-primary hover:underline">View All</button>
//                   </div>
//                   <div className="space-y-4">
//                     {recentProjects.map((project) => (
//                       <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
//                         <div className="flex-1">
//                           <h4 className="font-medium line-clamp-1">{project.title}</h4>
//                           <p className="text-sm text-muted-foreground">{project.date}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             project.status === 'Live' 
//                               ? 'bg-green-500/10 text-green-500' 
//                               : 'bg-blue-500/10 text-blue-500'
//                           }`}>
//                             {project.status}
//                           </span>
//                           <button className="p-1 hover:bg-muted rounded">
//                             <PencilIcon className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           )}

//           {activeSection === 'blogs' && (
//             <BlogManagement />
//           )}

//           {activeSection === 'work' && (
//             <WorkManagement />
//           )}

//           {activeSection === 'analytics' && (
//             <Analytics />
//           )}
//         </div>
//       </section>
//     </Layout>
//   )
// }



// function Analytics() {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Page Views</h3>
//             <p className="text-3xl font-bold text-primary">2,847</p>
//             <p className="text-sm text-muted-foreground">+12% from last month</p>
//           </div>
//         </Card>
        
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Unique Visitors</h3>
//             <p className="text-3xl font-bold text-primary">1,234</p>
//             <p className="text-sm text-muted-foreground">+8% from last month</p>
//           </div>
//         </Card>
        
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Avg. Session Duration</h3>
//             <p className="text-3xl font-bold text-primary">4m 32s</p>
//             <p className="text-sm text-muted-foreground">+5% from last month</p>
//           </div>
//         </Card>
        
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Bounce Rate</h3>
//             <p className="text-3xl font-bold text-primary">23%</p>
//             <p className="text-sm text-muted-foreground">-3% from last month</p>
//           </div>
//         </Card>
        
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Top Blog Post</h3>
//             <p className="text-sm font-medium line-clamp-2">10 Essential Shopify App Development Best Practices for 2025</p>
//             <p className="text-sm text-muted-foreground">1,247 views</p>
//           </div>
//         </Card>
        
//         <Card className="p-6">
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold">Top Project</h3>
//             <p className="text-sm font-medium line-clamp-2">Custom Product Feed Generator</p>
//             <p className="text-sm text-muted-foreground">892 views</p>
//           </div>
//         </Card>
//       </div>
      
//       <Card className="p-6">
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Recent Activity</h3>
//           <div className="space-y-3">
//             <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">New blog post published</p>
//                 <p className="text-xs text-muted-foreground">"The Future of E-commerce: AI-Powered Shopify Solutions" - 2 hours ago</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Project status updated</p>
//                 <p className="text-xs text-muted-foreground">"Sub Collection Creator App" moved to In Development - 1 day ago</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">New project added</p>
//                 <p className="text-xs text-muted-foreground">"Shopify Plus Pickup Point Customiser" - 3 days ago</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// } 