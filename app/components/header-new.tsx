'use client'

import { getResumeData } from 'lib/get-resume'
import BoxedText from './boxed-text'
import { AnimatedSection, StaggerContainer, StaggerItem } from 'lib/animations'

// Server component wrapper to get data
import { ResumeHeader } from 'lib/resume-types'

interface MainHeaderProps {
  header: ResumeHeader
  skills: string[]
}

export default function MainHeader({ header, skills }: MainHeaderProps) {
  return (
    <AnimatedSection className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-figma-inside-gap">
            <h1 className="font-semibold italic text-xl md:text-2xl">
              {header.name.toLowerCase()}
            </h1>
            <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-1">
              {skills.slice(0, 6).map((skill) => (
                <StaggerItem key={skill}>
                  <BoxedText text={skill.toLowerCase()} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            <p className="italic text-neutral-400">
              embedded software engineer @ <span className="text-white font-medium">ABB</span>
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-normal italic text-neutral-400">
              {header.location}
            </p>
            <p className="font-normal text-neutral-500 text-xs">
              {header.email}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
