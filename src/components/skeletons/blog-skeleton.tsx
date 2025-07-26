import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero Section Skeleton */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>
      </section>

      {/* Featured Post Skeleton */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <section className="w-full py-8 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Skeleton */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 