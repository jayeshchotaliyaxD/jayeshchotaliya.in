import { Projects } from 'app/components/projects'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold mb-8">Projects</h1>
      <Projects />
    </section>
  )
}
