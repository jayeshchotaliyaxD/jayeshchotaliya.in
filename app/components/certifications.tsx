'use client'

import { AnimatedSection, StaggerContainer, StaggerItem } from 'lib/animations'
import type { Certification } from 'lib/resume-types'

interface CertificationsProps {
  certifications: Certification[]
  activities: string[]
  notableProjects: string[]
}

export default function Certifications({ certifications, activities, notableProjects }: CertificationsProps) {
  return (
    <AnimatedSection delay={0.6} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Certifications & Activities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Certifications */}
          <div className="p-4 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
            <h3 className="font-medium text-white text-sm mb-3">Certifications</h3>
            <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-2">
              {certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <div className="text-sm">
                    <span className="text-neutral-200">{cert.name}</span>
                    <span className="text-neutral-500"> — {cert.organization}</span>
                    <span className="text-neutral-600 text-xs block">{cert.period}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          
          {/* Activities */}
          <div className="p-4 rounded-lg border border-neutral-800/50 bg-neutral-900/20">
            <h3 className="font-medium text-white text-sm mb-3">Leadership & Activities</h3>
            <StaggerContainer staggerDelay={0.05} className="flex flex-col gap-2">
              {activities.map((activity, index) => (
                <StaggerItem key={index}>
                  <p className="text-neutral-300 text-sm">• {activity}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        
        {/* Notable Projects */}
        {notableProjects.length > 0 && (
          <div className="p-4 rounded-lg border border-[#4c97f8]/30 bg-[#4c97f8]/5">
            <h3 className="font-medium text-[#4c97f8] text-sm mb-2">Notable Achievement</h3>
            {notableProjects.map((project, index) => (
              <p key={index} className="text-neutral-200 text-sm">
                {project}
              </p>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}
