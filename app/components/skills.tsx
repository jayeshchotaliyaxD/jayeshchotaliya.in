'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem, AnimatedBadge } from 'lib/animations'
import type { SkillCategory } from 'lib/resume-types'

const categoryIcons: Record<string, string> = {
  'Languages': '⟨/⟩',
  'Embedded Systems': '⎔',
  'Protocols & Interfaces': '⇌',
  'Tools & Frameworks': '⚙',
  'Cloud & Security': '☁',
}

interface SkillsProps {
  skills: SkillCategory[]
}

export default function Skills({ skills }: SkillsProps) {
  const maxSkills = Math.max(...skills.map((c) => c.skills.length), 1)

  return (
    <AnimatedSection delay={0.3}>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold italic text-neutral-300">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((category) => (
            <div
              key={category.category}
              className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-accent/20 transition-all group"
            >
              {/* Category header with icon */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent text-sm">
                  {categoryIcons[category.category] || '●'}
                </span>
                <h3 className="font-medium text-white text-sm">
                  {category.category}
                </h3>
              </div>

              {/* Progress bar */}
              <div className="h-1 rounded-full bg-neutral-800 mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(category.skills.length / maxSkills) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                />
              </div>

              {/* Skill badges */}
              <StaggerContainer staggerDelay={0.03} className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <AnimatedBadge className="inline-block px-2.5 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300 hover:bg-accent/20 hover:text-white transition-colors cursor-default">
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
