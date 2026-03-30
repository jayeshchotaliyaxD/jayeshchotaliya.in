'use client'

import Link from 'next/link'
import { StaggerContainer, StaggerItem, HoverLift } from 'lib/animations'

type PostData = {
  slug: string
  title: string
  date: string
}

export function AnimatedPostsList({ posts }: { posts: PostData[] }) {
  return (
    <StaggerContainer staggerDelay={0.08} className="flex flex-col gap-1">
      {posts.map((post) => (
        <StaggerItem key={post.slug}>
          <HoverLift>
            <Link
              className="flex flex-col gap-figma-inside-gap group p-3 -mx-3 rounded-lg hover:bg-neutral-900/50 transition-colors"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-row items-center space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 mr-4 md:mr-10 tabular-nums shrink-0">
                  {post.date}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-accent transition-colors">
                  {post.title}
                </p>
              </div>
            </Link>
          </HoverLift>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
