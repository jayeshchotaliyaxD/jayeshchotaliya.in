'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, FadeInView } from 'lib/animations'
import BoxedText from './boxed-text'
import type { Experience } from 'lib/resume-types'

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <AnimatedSection delay={0.2}>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold italic text-neutral-300">
          Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <TimelineCard key={`${exp.company}-${index}`} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function TimelineCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 0
  const visibleBullets = expanded ? exp.bullets : exp.bullets.slice(0, 2)

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div
        className="absolute left-3 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-neutral-900 z-10"
        style={{ top: '1.5rem', boxShadow: '0 0 8px var(--color-accent-glow)' }}
      />

      {/* Card container */}
      <FadeInView
        delay={index * 0.1}
        className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
          isEven ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
        }`}
      >
        <motion.div
          className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-accent/20 transition-all glow-border"
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-white text-base">
                  {exp.title}
                </h3>
                <span className="text-neutral-500 text-xs whitespace-nowrap mt-1">
                  {exp.period}
                </span>
              </div>
              <p className="text-neutral-400 text-sm">
                {exp.company} — {exp.location}
              </p>
            </div>

            {/* Bullets */}
            <ul className="list-disc list-inside space-y-1.5 text-neutral-300 text-sm">
              <AnimatePresence mode="sync">
                {visibleBullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="leading-relaxed"
                  >
                    {bullet}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Show more toggle */}
            {exp.bullets.length > 2 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-accent text-xs hover:text-accent-hover transition-colors text-left"
              >
                {expanded ? '← Show less' : `+${exp.bullets.length - 2} more accomplishments →`}
              </button>
            )}

            {/* Technologies */}
            {exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/50">
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
        </motion.div>
      </FadeInView>
    </div>
  )
}
