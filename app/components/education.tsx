'use client'

import { AnimatedSection, StaggerContainer, StaggerItem } from 'lib/animations'
import type { Education as EducationType } from 'lib/resume-types'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <AnimatedSection delay={0.5} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Education
        </h2>
        
        <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-3">
          {education.map((edu, index) => (
            <StaggerItem key={`${edu.institution}-${index}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 p-3 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
                <div>
                  <h3 className="font-medium text-white text-sm">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-400 text-xs">
                    {edu.institution}
                  </p>
                  <p className="text-neutral-500 text-xs">
                    {edu.grade}
                  </p>
                </div>
                <span className="text-neutral-500 text-xs whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
