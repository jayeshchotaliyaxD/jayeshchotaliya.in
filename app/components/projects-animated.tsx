'use client'

import Link from 'next/link'
import Image from 'next/image'
import BoxedText from './boxed-text'
import { StaggerContainer, StaggerItem, HoverLift } from 'lib/animations'

type ProjectData = {
  slug: string
  title: string
  date: string
  summary: string
  image: string | null
  tech: string[]
}

export function AnimatedProjectsList({ projects }: { projects: ProjectData[] }) {
  return (
    <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-2">
      {projects.map((project) => (
        <StaggerItem key={project.slug}>
          <HoverLift>
            <Link
              className="group flex flex-col md:flex-row md:gap-4 items-start p-3 -mx-3 rounded-xl hover:bg-neutral-900/50 transition-colors"
              href={`/projects/${project.slug}`}
            >
              <div className="w-full md:w-44 shrink-0 relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden bg-neutral-800 border border-neutral-800 group-hover:border-accent/20 transition-colors">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                )}
              </div>

              <div className="flex flex-col flex-1 min-w-0 mt-3 md:mt-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h2 className="font-semibold tracking-tight text-neutral-100 group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-neutral-500 tabular-nums shrink-0 ml-4 text-xs">
                    {project.date}
                  </p>
                </div>

                <p className="text-neutral-400 line-clamp-2 mb-2 text-sm">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((t) => (
                    <BoxedText key={t} text={t} />
                  ))}
                </div>
              </div>
            </Link>
          </HoverLift>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
