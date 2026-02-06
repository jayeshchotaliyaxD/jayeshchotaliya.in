'use client'

import { AnimatedSection, StaggerContainer, StaggerItem, AnimatedBadge } from 'lib/animations'
import type { SkillCategory } from 'lib/resume-types'

interface SkillsProps {
  skills: SkillCategory[]
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <AnimatedSection delay={0.3} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((category, index) => (
            <div
              key={category.category}
              className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/30"
            >
              <h3 className="font-medium text-white text-sm mb-3">
                {category.category}
              </h3>
              <StaggerContainer staggerDelay={0.03} className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <AnimatedBadge className="inline-block px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors cursor-default">
                      {skill}
                    </AnimatedBadge>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
