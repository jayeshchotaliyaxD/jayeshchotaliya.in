import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getProjects } from 'app/projects/utils'
import BoxedText from './boxed-text'
import { AnimatedProjectsList } from './projects-animated'

type ProjectsProps = {
  limit?: number
}

export function Projects({ limit }: ProjectsProps) {
  let allProjects = getProjects()

  let sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  let displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects

  const projects = displayedProjects.map((project) => ({
    slug: project.slug,
    title: project.metadata.title,
    date: formatDate(project.metadata.publishedAt, false),
    summary: project.metadata.summary,
    image: project.metadata.image || null,
    tech: project.metadata.tech
      ? project.metadata.tech.split(',').map((t) => t.trim())
      : [],
  }))

  return (
    <div className="flex flex-col gap-2">
      <AnimatedProjectsList projects={projects} />

      {limit && (
        <Link
          href="/projects"
          className="inline-flex items-center mt-4 text-accent hover:text-accent-hover transition-colors text-sm"
        >
          View all projects →
        </Link>
      )}
    </div>
  )
}
