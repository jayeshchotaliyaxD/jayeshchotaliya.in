'use client'

import { AnimatedSection, StaggerContainer, StaggerItem, HoverLift, AnimatedGradientBorder } from 'lib/animations'
import type { Certification } from 'lib/resume-types'

interface CertificationsProps {
  certifications: Certification[]
  activities: string[]
  notableProjects: string[]
}

export default function Certifications({ certifications, activities, notableProjects }: CertificationsProps) {
  return (
    <AnimatedSection delay={0.6}>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold italic text-neutral-300">
          Certifications & Activities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Certifications */}
          <div className="p-5 rounded-xl border border-neutral-800/50 bg-neutral-900/20">
            <h3 className="font-medium text-white text-sm mb-3 flex items-center gap-2">
              <span className="text-accent">📜</span> Certifications
            </h3>
            <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-3">
              {certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <HoverLift>
                    <div className="text-sm p-2 rounded-lg hover:bg-neutral-800/30 transition-colors">
                      <span className="text-neutral-200">{cert.name}</span>
                      <span className="text-neutral-500"> — {cert.organization}</span>
                      <span className="text-neutral-600 text-xs block mt-0.5">{cert.period}</span>
                    </div>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Activities */}
          <div className="p-5 rounded-xl border border-neutral-800/50 bg-neutral-900/20">
            <h3 className="font-medium text-white text-sm mb-3 flex items-center gap-2">
              <span className="text-accent">⭐</span> Leadership & Activities
            </h3>
            <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-3">
              {activities.map((activity, index) => (
                <StaggerItem key={index}>
                  <HoverLift>
                    <p className="text-neutral-300 text-sm p-2 rounded-lg hover:bg-neutral-800/30 transition-colors">
                      • {activity}
                    </p>
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Notable Projects */}
        {notableProjects.length > 0 && (
          <AnimatedGradientBorder>
            <div className="p-5">
              <h3 className="font-medium text-accent text-sm mb-2 flex items-center gap-2">
                <span>🏆</span> Notable Achievement
              </h3>
              {notableProjects.map((project, index) => (
                <p key={index} className="text-neutral-200 text-sm leading-relaxed">
                  {project}
                </p>
              ))}
            </div>
          </AnimatedGradientBorder>
        )}
      </div>
    </AnimatedSection>
  )
}
