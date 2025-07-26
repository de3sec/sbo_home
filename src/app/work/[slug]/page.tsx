import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverProjectApi } from '@/lib/server-api'
import { ProjectDetail } from '@/components/project-detail-new'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await serverProjectApi.getBySlug(params.slug)
    const project = response.data as any
    
    return {
      title: `${project.title} - SBO Tech Work`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Project - SBO Tech',
      description: 'Project not found',
    }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  try {
    const response = await serverProjectApi.getBySlug(params.slug)
    const project = response.data as any
    
    if (!project) {
      notFound()
    }
    
    return <ProjectDetail project={project} />
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
} 