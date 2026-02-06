'use client'

import { AnimatedSection, StaggerContainer, StaggerItem, HoverLift } from 'lib/animations'
import BoxedText from './boxed-text'
import type { Experience } from 'lib/resume-types'

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <AnimatedSection delay={0.2} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Experience
        </h2>
        
        <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <StaggerItem key={`${exp.company}-${index}`}>
              <HoverLift className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors">
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <div>
                      <h3 className="font-semibold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        {exp.company} — {exp.location}
                      </p>
                    </div>
                    <span className="text-neutral-500 text-xs whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  
                  {/* Bullets */}
                  <ul className="list-disc list-inside space-y-1 text-neutral-300 text-sm">
                    {exp.bullets.slice(0, 4).map((bullet, i) => (
                      <li key={i} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                    {exp.bullets.length > 4 && (
                      <li className="text-neutral-500 italic">
                        +{exp.bullets.length - 4} more accomplishments
                      </li>
                    )}
                  </ul>
                  
                  {/* Technologies */}
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-800">
                      {exp.technologies.slice(0, 8).map((tech) => (
                        <BoxedText key={tech} text={tech} />
                      ))}
                      {exp.technologies.length > 8 && (
                        <span className="text-neutral-500 text-xs px-2 py-0.5">
                          +{exp.technologies.length - 8}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
