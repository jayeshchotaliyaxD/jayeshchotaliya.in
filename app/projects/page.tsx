import { Projects } from 'app/components/projects'
import { FadeInView } from 'lib/animations'

export const metadata = {
  title: 'Projects',
  description: 'Engineering projects by Jayesh Chotaliya.',
}

export default function Page() {
  return (
    <section>
      <FadeInView>
        <h1 className="font-semibold text-2xl mb-8">Projects</h1>
      </FadeInView>
      <Projects />
    </section>
  )
}
