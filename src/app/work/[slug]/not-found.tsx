import Link from "next/link"
import { Layout } from "@/components/shared/layout"

export default function WorkNotFound() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground text-lg">
            The project you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Back to Work
          </Link>
        </div>
      </div>
    </Layout>
  )
} 