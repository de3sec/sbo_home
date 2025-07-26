import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import Project from '@/models/Project'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'
import ContactMessage from '@/models/ContactMessage'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    // Get current date for time-based analytics
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Blog Posts Analytics
    const [
      totalBlogPosts,
      publishedBlogPosts,
      draftBlogPosts,
      archivedBlogPosts,
      featuredBlogPosts,
      blogPostsThisMonth,
      blogPostsThisWeek,
      blogPostsByCategory
    ] = await Promise.all([
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'published' }),
      BlogPost.countDocuments({ status: 'draft' }),
      BlogPost.countDocuments({ status: 'archived' }),
      BlogPost.countDocuments({ featured: true }),
      BlogPost.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      BlogPost.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      BlogPost.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ])

    // Projects Analytics
    const [
      totalProjects,
      liveProjects,
      inDevelopmentProjects,
      completedProjects,
      archivedProjects,
      projectsThisMonth,
      projectsThisWeek,
      projectsByCategory
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'live' }),
      Project.countDocuments({ status: 'in-development' }),
      Project.countDocuments({ status: 'completed' }),
      Project.countDocuments({ status: 'archived' }),
      Project.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Project.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Project.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ])

    // Recent Activity
    const [recentBlogPosts, recentProjects] = await Promise.all([
      BlogPost.find()
        .select('title status createdAt updatedAt')
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean(),
      Project.find()
        .select('title status createdAt updatedAt')
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean()
    ])

    // Newsletter Analytics
    const [
      totalSubscribers,
      activeSubscribers,
      subscribersThisMonth,
      subscribersThisWeek
    ] = await Promise.all([
      NewsletterSubscriber.countDocuments(),
      NewsletterSubscriber.countDocuments({ isActive: true }),
      NewsletterSubscriber.countDocuments({ subscribedAt: { $gte: thirtyDaysAgo } }),
      NewsletterSubscriber.countDocuments({ subscribedAt: { $gte: sevenDaysAgo } })
    ])

    // Contact Messages Analytics
    const [
      totalMessages,
      newMessages,
      readMessages,
      messagesThisMonth,
      messagesThisWeek
    ] = await Promise.all([
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: 'new' }),
      ContactMessage.countDocuments({ isRead: true }),
      ContactMessage.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      ContactMessage.countDocuments({ createdAt: { $gte: sevenDaysAgo } })
    ])

    // Calculate growth percentages (mock data for now, can be enhanced with historical data)
    const blogGrowth = blogPostsThisMonth > 0 ? Math.round((blogPostsThisWeek / blogPostsThisMonth) * 100) : 0
    const projectGrowth = projectsThisMonth > 0 ? Math.round((projectsThisWeek / projectsThisMonth) * 100) : 0

    const analytics = {
      overview: {
        totalContent: totalBlogPosts + totalProjects,
        totalBlogPosts,
        totalProjects,
        publishedContent: publishedBlogPosts + liveProjects + completedProjects,
        contentThisMonth: blogPostsThisMonth + projectsThisMonth,
        contentThisWeek: blogPostsThisWeek + projectsThisWeek
      },
      newsletter: {
        total: totalSubscribers,
        active: activeSubscribers,
        thisMonth: subscribersThisMonth,
        thisWeek: subscribersThisWeek
      },
      contact: {
        total: totalMessages,
        new: newMessages,
        read: readMessages,
        thisMonth: messagesThisMonth,
        thisWeek: messagesThisWeek
      },
      blogPosts: {
        total: totalBlogPosts,
        published: publishedBlogPosts,
        draft: draftBlogPosts,
        archived: archivedBlogPosts,
        featured: featuredBlogPosts,
        thisMonth: blogPostsThisMonth,
        thisWeek: blogPostsThisWeek,
        growth: blogGrowth,
        byCategory: blogPostsByCategory
      },
      projects: {
        total: totalProjects,
        live: liveProjects,
        inDevelopment: inDevelopmentProjects,
        completed: completedProjects,
        archived: archivedProjects,
        thisMonth: projectsThisMonth,
        thisWeek: projectsThisWeek,
        growth: projectGrowth,
        byCategory: projectsByCategory
      },
      recentActivity: {
        blogPosts: recentBlogPosts,
        projects: recentProjects
      },
      performance: {
        averagePostsPerMonth: Math.round(totalBlogPosts / 12), // Assuming 1 year of data
        averageProjectsPerMonth: Math.round(totalProjects / 12),
        publicationRate: totalBlogPosts > 0 ? Math.round((publishedBlogPosts / totalBlogPosts) * 100) : 0,
        completionRate: totalProjects > 0 ? Math.round(((liveProjects + completedProjects) / totalProjects) * 100) : 0
      }
    }

    return NextResponse.json({ data: analytics }, { status: 200 })
  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
} 