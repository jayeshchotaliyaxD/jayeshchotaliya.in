'use client'

import { AnimatedSection, StaggerContainer, StaggerItem, HoverLift } from 'lib/animations'
import type { Project } from 'lib/resume-types'

interface ProjectsResumeProps {
  projects: Project[]
}

export default function ProjectsResume({ projects }: ProjectsResumeProps) {
  return (
    <AnimatedSection delay={0.4} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Projects
        </h2>
        
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <StaggerItem key={project.name}>
              <HoverLift className="h-full p-4 rounded-lg border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors">
                <div className="flex flex-col gap-2 h-full">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-white text-sm">
                      {project.name}
                    </h3>
                    <span className="text-neutral-500 text-xs whitespace-nowrap">
                      {project.date}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-xs">
                    {project.organization}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400 text-xs mt-auto">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
