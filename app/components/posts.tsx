import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { AnimatedPostsList } from './posts-animated'

type BlogPostsProps = {
  limit?: number
}

export function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = getBlogPosts()

  let sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  const showViewAll = limit && allBlogs.length > limit
  let displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs

  const posts = displayedBlogs.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    date: formatDate(post.metadata.publishedAt, false),
  }))

  return (
    <div>
      <AnimatedPostsList posts={posts} />

      {showViewAll && (
        <Link
          href="/blog"
          className="inline-flex items-center mt-4 text-accent hover:text-accent-hover transition-colors text-sm"
        >
          Read all writings →
        </Link>
      )}
    </div>
  )
}
