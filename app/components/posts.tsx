import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

// 1. Define Props to make limit optional
type BlogPostsProps = {
  limit?: number
}

export function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = getBlogPosts()

  // Sort blogs by date
  let sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 2. Apply limit if provided
  let displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs

  return (
    <div>
      {displayedBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4 group"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[150px] tabular-nums shrink-0">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline decoration-neutral-400 underline-offset-4">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}

      {/* 3. Conditional "View All" Button */}
      {limit && (
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mt-2"
        >
          Read all writings
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}