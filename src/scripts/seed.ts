import dbConnect from '../lib/mongodb'
import BlogPost from '../models/BlogPost'
import Project from '../models/Project'

const blogPosts = [
  {
    title: "10 Essential Shopify App Development Best Practices for 2025",
    excerpt: "Discover the latest best practices for developing high-performance Shopify apps that drive conversions and enhance user experience.",
    content: `
      <h2>Introduction</h2>
      <p>Shopify app development has evolved significantly over the past few years, with new technologies and best practices emerging constantly. In this comprehensive guide, we'll explore the essential practices that every Shopify app developer should follow in 2025.</p>
      
      <h2>1. Performance Optimization</h2>
      <p>Performance is crucial for any Shopify app. Users expect fast loading times and smooth interactions. Here are some key optimization techniques:</p>
      <ul>
        <li>Implement lazy loading for images and components</li>
        <li>Use efficient data fetching patterns</li>
        <li>Optimize database queries</li>
        <li>Implement proper caching strategies</li>
      </ul>
      
      <h2>2. Security Best Practices</h2>
      <p>Security should be a top priority when developing Shopify apps. Always follow these security guidelines:</p>
      <ul>
        <li>Validate all user inputs</li>
        <li>Use HTTPS for all communications</li>
        <li>Implement proper authentication and authorization</li>
        <li>Regular security audits and updates</li>
      </ul>
      
      <h2>3. User Experience Design</h2>
      <p>A great user experience is essential for app success. Focus on:</p>
      <ul>
        <li>Intuitive navigation and interface design</li>
        <li>Responsive design for all devices</li>
        <li>Clear error messages and feedback</li>
        <li>Accessibility compliance</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>By following these best practices, you'll be well-positioned to create successful Shopify apps that meet the needs of modern e-commerce businesses.</p>
    `,
    author: {
      name: "SBO Tech Team",
      avatar: "/placeholder-avatar.svg",
      role: "Lead Developer",
      bio: "Expert in Shopify app development with 8+ years of experience."
    },
    publishedAt: new Date("2025-01-15"),
    readTime: "8 min read",
    category: "Development",
    featured: true,
    image: "/hero-image.jpg",
    tags: ["Shopify", "App Development", "Best Practices"],
    status: "published",
    slug: "10-essential-shopify-app-development-best-practices-for-2025"
  },
  {
    title: "How to Optimize Your Shopify Store for Maximum Performance",
    excerpt: "Learn proven techniques to speed up your Shopify store and improve your Core Web Vitals scores for better SEO and user experience.",
    content: `
      <h2>Why Performance Matters</h2>
      <p>Performance optimization is crucial for any e-commerce store. Slow loading times can significantly impact conversion rates and user experience. In this guide, we'll explore proven techniques to optimize your Shopify store.</p>
      
      <h2>Core Web Vitals Optimization</h2>
      <p>Google's Core Web Vitals are key metrics for measuring user experience:</p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP):</strong> Optimize for under 2.5 seconds</li>
        <li><strong>First Input Delay (FID):</strong> Keep under 100 milliseconds</li>
        <li><strong>Cumulative Layout Shift (CLS):</strong> Maintain under 0.1</li>
      </ul>
      
      <h2>Image Optimization Techniques</h2>
      <p>Images often account for the largest portion of page weight:</p>
      <ul>
        <li>Use WebP format with fallbacks</li>
        <li>Implement lazy loading</li>
        <li>Optimize image dimensions</li>
        <li>Use responsive images</li>
      </ul>
      
      <h2>Code Optimization</h2>
      <p>Minimize and optimize your code:</p>
      <ul>
        <li>Remove unused CSS and JavaScript</li>
        <li>Minify all assets</li>
        <li>Use efficient loading strategies</li>
        <li>Implement proper caching</li>
      </ul>
    `,
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder-avatar.svg",
      role: "Performance Engineer",
      bio: "Specialized in performance optimization and Core Web Vitals."
    },
    publishedAt: new Date("2025-01-12"),
    readTime: "12 min read",
    category: "Performance",
    featured: false,
    image: "/services-image.jpg",
    tags: ["Performance", "SEO", "Optimization"],
    status: "published",
    slug: "how-to-optimize-your-shopify-store-for-maximum-performance"
  },
  {
    title: "The Future of E-commerce: AI-Powered Shopify Solutions",
    excerpt: "Explore how artificial intelligence is revolutionizing the e-commerce landscape and how you can leverage AI in your Shopify store.",
    content: `
      <h2>The AI Revolution in E-commerce</h2>
      <p>Artificial intelligence is no longer a futuristic concept—it's here and transforming how we do business online. From personalized recommendations to automated customer service, AI is becoming an essential tool for e-commerce success.</p>
      
      <h2>AI Applications in Shopify</h2>
      <p>Here are some key areas where AI can enhance your Shopify store:</p>
      <ul>
        <li><strong>Product Recommendations:</strong> Personalized suggestions based on user behavior</li>
        <li><strong>Chatbots:</strong> 24/7 customer support and assistance</li>
        <li><strong>Inventory Management:</strong> Predictive analytics for stock optimization</li>
        <li><strong>Pricing Optimization:</strong> Dynamic pricing based on market conditions</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>Getting started with AI in your Shopify store:</p>
      <ul>
        <li>Start with simple AI-powered features</li>
        <li>Integrate with existing Shopify apps</li>
        <li>Focus on user experience improvements</li>
        <li>Measure and optimize results</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated applications in e-commerce. Staying ahead of these trends will be crucial for business success.</p>
    `,
    author: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-avatar.svg",
      role: "AI Specialist",
      bio: "AI and machine learning expert focused on e-commerce solutions."
    },
    publishedAt: new Date("2025-01-10"),
    readTime: "15 min read",
    category: "AI & Innovation",
    featured: false,
    image: "/hero-image.jpg",
    tags: ["AI", "E-commerce", "Innovation"],
    status: "published",
    slug: "the-future-of-e-commerce-ai-powered-shopify-solutions"
  }
]

const projects = [
  {
    title: "Custom Product Feed Generator",
    category: "Product Management",
    description: "Advanced product feed generation system that creates optimized feeds for Google Shopping, Facebook Ads, and other marketing platforms with real-time inventory updates and dynamic pricing.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>We developed a comprehensive product feed generation system for a major e-commerce retailer that needed to optimize their advertising campaigns across multiple platforms.</p>
      
      <h2>Challenge</h2>
      <p>The client was struggling with manual feed management across multiple advertising platforms, leading to inconsistent product data, delayed updates, and poor campaign performance.</p>
      
      <h2>Solution</h2>
      <p>We built a custom Shopify app that automatically generates optimized feeds for Google Shopping, Facebook Ads, and other platforms with real-time inventory updates and dynamic pricing.</p>
      
      <h2>Results</h2>
      <p>The implementation resulted in a 40% increase in ad conversion rates and a 60% reduction in manual feed management time.</p>
    `,
    features: [
      "Real-time inventory synchronization",
      "Dynamic pricing integration",
      "Multi-platform feed generation",
      "Advanced filtering and mapping",
      "Automated feed updates",
      "Performance analytics"
    ],
    technologies: ["Shopify API", "Node.js", "React", "PostgreSQL", "Redis"],
    image: "/hero-image.jpg",
    status: "live",
    client: "E-commerce Retailer",
    impact: "40% increase in ad conversion rates",
    timeline: "3 months",
    team: "4 developers, 1 designer, 1 project manager",
    slug: "custom-product-feed-generator"
  },
  {
    title: "Server-Side Google Tracking",
    category: "Analytics & Tracking",
    description: "Headless server-side Google Analytics and Google Ads tracking solution that provides accurate conversion tracking without client-side dependencies, ensuring data integrity and compliance.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>We developed a server-side tracking solution for a multi-brand retailer that needed accurate conversion tracking while maintaining privacy compliance and avoiding ad blockers.</p>
      
      <h2>Challenge</h2>
      <p>The client was experiencing significant data loss due to ad blockers and privacy tools blocking client-side tracking scripts.</p>
      
      <h2>Solution</h2>
      <p>We implemented a comprehensive server-side tracking system using Google Analytics 4 and Google Ads API that processes all tracking events server-side.</p>
      
      <h2>Results</h2>
      <p>The server-side tracking implementation resulted in a 25% improvement in tracking accuracy and complete compliance with privacy regulations.</p>
    `,
    features: [
      "Server-side event tracking",
      "Enhanced e-commerce tracking",
      "Cross-domain tracking",
      "Privacy compliance (GDPR/CCPA)",
      "Real-time data processing",
      "Custom event mapping"
    ],
    technologies: ["Google Analytics 4", "Google Ads API", "Node.js", "Cloud Functions", "BigQuery"],
    image: "/services-image.jpg",
    status: "live",
    client: "Multi-brand Retailer",
    impact: "25% improvement in tracking accuracy",
    timeline: "2 months",
    team: "3 developers, 1 data analyst",
    slug: "server-side-google-tracking"
  },
  {
    title: "Sub Collection Creator App",
    category: "Catalog Management",
    description: "Intelligent sub-collection management system that automatically creates and manages product collections based on tags, attributes, and custom rules, streamlining catalog organization.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>We developed an intelligent sub-collection management system for a fashion retailer that needed to streamline their catalog organization.</p>
      
      <h2>Challenge</h2>
      <p>The client was spending hours manually creating and managing product collections, leading to inconsistent organization and poor user experience.</p>
      
      <h2>Solution</h2>
      <p>We built an automated system that creates and manages product collections based on tags, attributes, and custom rules.</p>
      
      <h2>Results</h2>
      <p>The implementation resulted in a 60% reduction in manual catalog work and improved product discoverability.</p>
    `,
    features: [
      "Automated collection creation",
      "Smart tagging system",
      "Bulk product management",
      "Custom collection rules",
      "SEO optimization",
      "Performance monitoring"
    ],
    technologies: ["Shopify Liquid", "JavaScript", "GraphQL", "MongoDB", "AWS Lambda"],
    image: "/hero-image.jpg",
    status: "in-development",
    client: "Fashion Retailer",
    impact: "60% reduction in manual catalog work",
    timeline: "4 months",
    team: "3 developers, 1 designer",
    slug: "sub-collection-creator-app"
  }
]

async function seed() {
  try {
    await dbConnect()
    
    // Clear existing data
    await BlogPost.deleteMany({})
    await Project.deleteMany({})
    
    // Insert blog posts
    const createdBlogPosts = await BlogPost.insertMany(blogPosts)
    console.log(`Created ${createdBlogPosts.length} blog posts`)
    
    // Insert projects
    const createdProjects = await Project.insertMany(projects)
    console.log(`Created ${createdProjects.length} projects`)
    
    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed() 