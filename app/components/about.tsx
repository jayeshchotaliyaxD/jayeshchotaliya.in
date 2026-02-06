'use client'

import { AnimatedSection } from 'lib/animations'
import type { Experience } from 'lib/resume-types'

interface AboutProps {
  currentJob: Experience
}

export default function About({ currentJob }: AboutProps) {
  return (
    <AnimatedSection delay={0.1} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          About
        </h2>
        <p className="text-neutral-200 leading-relaxed">
          {currentJob.title} at{' '}
          <span className="inline-flex items-center gap-1 bg-neutral-800 text-white rounded px-1.5 py-0.5 text-xs font-medium">
            {currentJob.company}
          </span>
          , architecting secure cloud connectivity for industrial drives and building
          firmware modules for real-time data exchange. Passionate about embedded systems,
          IoT protocols, and optimizing system performance.
        </p>
        <p className="text-neutral-400">
          B.E. in Electronics & Communication from L.D. College of Engineering.
          Contributed to the Red Dot Award-winning ABB EGW-02 Connectivity Edge Gateway.
        </p>
      </div>
    </AnimatedSection>
  )
}
