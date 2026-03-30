'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem, AnimatedGradientBorder, GradientText } from 'lib/animations'
import type { Project } from 'lib/resume-types'

interface ProjectsResumeProps {
  projects: Project[]
}

export default function ProjectsResume({ projects }: ProjectsResumeProps) {
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <AnimatedSection delay={0.4}>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold italic text-neutral-300">
          Projects
        </h2>

        {/* Featured project */}
        {featured && (
          <AnimatedGradientBorder>
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-base">
                    <GradientText>{featured.name}</GradientText>
                  </h3>
                  <span className="text-neutral-500 text-xs whitespace-nowrap">
                    {featured.date}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs">{featured.organization}</p>
                <ul className="list-disc list-inside space-y-1.5 text-neutral-300 text-sm">
                  {featured.bullets.map((bullet, i) => (
                    <li key={i} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedGradientBorder>
        )}

        {/* Rest of projects in grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((project) => (
            <StaggerItem key={project.name}>
              <TiltCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}

function TiltCard({ project }: { project: Project }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return (
    <div
      className="h-full p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-accent/20 transition-all glow-border"
      style={{ transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-white text-sm">{project.name}</h3>
          <span className="text-neutral-500 text-xs whitespace-nowrap">{project.date}</span>
        </div>
        <p className="text-neutral-500 text-xs">{project.organization}</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-400 text-xs mt-auto">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="leading-relaxed">{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
