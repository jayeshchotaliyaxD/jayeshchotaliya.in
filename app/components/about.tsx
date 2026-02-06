'use client'

import { AnimatedSection, StaggerContainer, StaggerItem } from 'lib/animations'
import type { Experience, Education } from 'lib/resume-types'

interface AboutProps {
  currentJob: Experience
  education: Education[]
  notableProjects: string[]
}

export default function About({ currentJob, education, notableProjects }: AboutProps) {
  // Get first bullet points as summary
  const summaryBullets = currentJob.bullets.slice(0, 2)
  const primaryEducation = education[0]

  return (
    <AnimatedSection delay={0.1} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          About
        </h2>
        <p className="text-neutral-200 leading-relaxed">
          <span className="font-medium text-white">{currentJob.title}</span> at{' '}
          <span className="inline-flex items-center gap-1 bg-neutral-800 text-white rounded px-1.5 py-0.5 text-xs font-medium">
            {currentJob.company}
          </span>
          <span className="text-neutral-400"> — {currentJob.location}</span>
        </p>
        
        {/* Key highlights from current role */}
        <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-1">
          {summaryBullets.map((bullet, i) => (
            <StaggerItem key={i}>
              <p className="text-neutral-400 text-sm pl-3 border-l-2 border-neutral-700">
                {bullet}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Education summary */}
        {primaryEducation && (
          <p className="text-neutral-500 text-sm">
            {primaryEducation.degree} from {primaryEducation.institution} ({primaryEducation.grade})
          </p>
        )}

        {/* Notable achievement */}
        {notableProjects.length > 0 && (
          <p className="text-[#4c97f8] text-sm font-medium">
            ★ {notableProjects[0]}
          </p>
        )}
      </div>
    </AnimatedSection>
  )
}
