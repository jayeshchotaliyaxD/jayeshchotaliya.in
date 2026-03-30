'use client'

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedGradientBorder,
  TextReveal,
  CountUp,
} from 'lib/animations'
import type { Experience, Education } from 'lib/resume-types'

interface AboutProps {
  currentJob: Experience
  education: Education[]
  notableProjects: string[]
  profileSummary: string
}

export default function About({ currentJob, education, notableProjects, profileSummary }: AboutProps) {
  const summaryBullets = currentJob.bullets.slice(0, 2)
  const primaryEducation = education[0]

  return (
    <AnimatedSection delay={0.1}>
      <AnimatedGradientBorder>
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <h2 className="text-lg font-semibold italic text-neutral-300">
            About
          </h2>

          {/* Title & company */}
          <p className="text-neutral-200 leading-relaxed">
            <span className="font-medium text-white">{currentJob.title}</span> at{' '}
            <span className="inline-flex items-center gap-1 bg-neutral-800 text-white rounded px-1.5 py-0.5 text-xs font-medium">
              {currentJob.company}
            </span>
            <span className="text-neutral-400"> — {currentJob.location}</span>
          </p>

          {/* Profile summary with text reveal */}
          {profileSummary && (
            <div className="text-neutral-300 text-sm leading-relaxed">
              <TextReveal text={profileSummary} mode="word" delay={0.2} />
            </div>
          )}

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-neutral-800/50">
              <div className="text-2xl font-bold text-white">
                <CountUp end={2} suffix="+" />
              </div>
              <p className="text-neutral-400 text-xs mt-1">Years Experience</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-neutral-800/50">
              <div className="text-2xl font-bold text-white">
                <CountUp end={99.9} suffix="%" decimals={1} />
              </div>
              <p className="text-neutral-400 text-xs mt-1">Uptime Achieved</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-neutral-800/50">
              <div className="text-2xl font-bold text-white">
                <CountUp end={40} suffix="%" />
              </div>
              <p className="text-neutral-400 text-xs mt-1">Throughput Gain</p>
            </div>
          </div>

          {/* Key highlights */}
          <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-2">
            {summaryBullets.map((bullet, i) => (
              <StaggerItem key={i}>
                <p className="text-neutral-400 text-sm pl-4 border-l-2 border-accent/40 leading-relaxed">
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
            <p className="text-accent text-sm font-medium">
              ★ {notableProjects[0]}
            </p>
          )}
        </div>
      </AnimatedGradientBorder>
    </AnimatedSection>
  )
}
