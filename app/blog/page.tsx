import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Technical articles and engineering insights by Jayesh Chotaliya.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-8">Blog</h1>
      <BlogPosts />
    </section>
  )
}
