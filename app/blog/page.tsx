import { BlogPosts } from 'app/components/posts'
import { FadeInView } from 'lib/animations'

export const metadata = {
  title: 'Blog',
  description: 'Technical articles and engineering insights by Jayesh Chotaliya.',
}

export default function Page() {
  return (
    <section>
      <FadeInView>
        <h1 className="font-semibold text-2xl mb-8">Blog</h1>
      </FadeInView>
      <BlogPosts />
    </section>
  )
}
