'use client'

import { AnimatedSection, StaggerContainer, StaggerItem, HoverLift } from 'lib/animations'
import type { Education as EducationType } from 'lib/resume-types'

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  return (
    <AnimatedSection delay={0.5}>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold italic text-neutral-300">
          Education
        </h2>

        <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-4">
          {education.map((edu, index) => (
            <StaggerItem key={`${edu.institution}-${index}`}>
              <HoverLift>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 p-4 rounded-xl border-l-2 border-accent/40 bg-neutral-900/30 border border-neutral-800/50 hover:border-accent/20 transition-colors ml-0">
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-lg mt-0.5">🎓</span>
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
                  </div>
                  <span className="text-neutral-500 text-xs whitespace-nowrap ml-8 md:ml-0">
                    {edu.period}
                  </span>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
