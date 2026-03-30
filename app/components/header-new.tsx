'use client'

import BoxedText from './boxed-text'
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  GradientText,
  TextReveal,
  MagneticButton,
  FloatingElement,
} from 'lib/animations'
import type { ResumeHeader, Experience } from 'lib/resume-types'

interface MainHeaderProps {
  header: ResumeHeader
  skills: string[]
  currentJob: Experience
}

export default function MainHeader({ header, skills, currentJob }: MainHeaderProps) {
  const shortTitle = currentJob.title.split(' - ')[0] || currentJob.title
  const companyShort = currentJob.company.split(' ')[0] || currentJob.company

  return (
    <AnimatedSection className="relative min-h-[40vh] md:min-h-[60vh] flex items-center dot-pattern overflow-hidden">
      {/* Floating decorative shapes */}
      <FloatingElement
        amplitude={12}
        duration={5}
        delay={0}
        className="absolute top-10 right-10 md:right-20 pointer-events-none"
      >
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-accent/[0.06] blur-sm" />
      </FloatingElement>
      <FloatingElement
        amplitude={8}
        duration={6}
        delay={1}
        className="absolute bottom-16 right-1/4 pointer-events-none"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-purple-500/[0.05] blur-sm rotate-45" />
      </FloatingElement>
      <FloatingElement
        amplitude={15}
        duration={7}
        delay={2}
        className="absolute top-1/3 left-[80%] pointer-events-none hidden md:block"
      >
        <div className="w-10 h-10 rounded-full border border-accent/[0.1]" />
      </FloatingElement>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8 py-8 md:py-0">
        {/* Name */}
        <h1 className="font-bold text-4xl md:text-6xl tracking-tight">
          <GradientText>{header.name}</GradientText>
        </h1>

        {/* Title */}
        <div className="text-lg md:text-xl text-neutral-400">
          <TextReveal
            text={`${shortTitle} @ ${companyShort}`}
            mode="word"
            delay={0.3}
          />
        </div>

        {/* Location */}
        <p className="text-neutral-500 text-sm italic">{header.location}</p>

        {/* Skill tags */}
        <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-2">
          {skills.slice(0, 8).map((skill) => (
            <StaggerItem key={skill}>
              <BoxedText text={skill} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mt-2">
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Get in Touch
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full border border-accent text-accent text-sm font-medium hover:bg-accent/10 transition-colors"
            >
              View Resume
            </a>
          </MagneticButton>
        </div>
      </div>
    </AnimatedSection>
  )
}
