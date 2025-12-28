import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getProjects } from 'app/projects/utils'
import BoxedText from './boxed-text'

// 1. Define Props to make the limit optional
type ProjectsProps = {
  limit?: number
}

export function Projects({ limit }: ProjectsProps) {
  let allProjects = getProjects()

  // Sort projects by date
  let sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 2. Slice the array if a limit is provided
  let displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects

  return (
    <div className="flex flex-col gap-figma-inside-gap">
      {displayedProjects.map((project) => {
        const techStack = project.metadata.tech
          ? project.metadata.tech.split(',').map((t) => t.trim())
          : []

        return (
          <Link
            key={project.slug}
            className="group flex flex-col md:flex-row md:gap-4 items-start mb-4 md:mb-0"
            href={`/projects/${project.slug}`}
          >
            <div className="w-full md:w-40 shrink-0 relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
              {project.metadata.image && (
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 underline hover:decoration-neutral-400 underline-offset-4">
                  {project.metadata.title}
                </h2>
                <p className="text-neutral-500 tabular-nums shrink-0 ml-4">
                  {formatDate(project.metadata.publishedAt, false)}
                </p>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-1">
                {project.metadata.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {techStack.map((tech) => (
                  <BoxedText key={tech} text={tech} />
                ))}
              </div>
            </div>
          </Link>
        )
      })}

      {/* 3. Conditional "View All" Button */}
      {limit && (
        <Link
          href="/projects"
          className="inline-flex items-center underline hover:decoration-neutral-400 underline-offset-4"
        >
          View all projects
        </Link>
      )}
    </div>
  )
}