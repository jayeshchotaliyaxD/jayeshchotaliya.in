'use client'

import { motion } from 'framer-motion'
import { GradientText } from 'lib/animations'
import BoxedText from './boxed-text'
import type { Experience, Education } from 'lib/resume-types'

interface JourneyProps {
  experience: Experience[]
  education: Education[]
}

interface JourneyItem {
  period: string
  title: string
  org: string
  location?: string
  points: string[]
  tags: string[]
  kind: 'work' | 'education'
}

function buildItems(experience: Experience[], education: Education[]): JourneyItem[] {
  const work: JourneyItem[] = experience.map((exp) => ({
    period: exp.period,
    title: exp.title,
    org: exp.company,
    location: exp.location,
    points: exp.bullets.slice(0, 3),
    tags: exp.technologies.slice(0, 6),
    kind: 'work',
  }))

  const edu: JourneyItem[] = education.map((e) => ({
    period: e.period,
    title: e.degree,
    org: e.institution,
    location: e.location,
    points: [e.grade].filter(Boolean),
    tags: [],
    kind: 'education',
  }))

  return [...work, ...edu]
}

export default function Journey({ experience, education }: JourneyProps) {
  const items = buildItems(experience, education)

  return (
    <section id="journey" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            My <GradientText>Journey</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            From bare-metal firmware to award-winning industrial IoT platforms —
            a look at my professional evolution.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Spine */}
          <div className="absolute bottom-0 left-[20px] top-0 w-[2px] bg-gradient-to-b from-accent/20 via-purple-500/50 to-accent/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((item, index) => (
              <JourneyCard key={`${item.org}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneyCard({ item, index }: { item: JourneyItem; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="hidden w-1/2 md:block" />

      {/* Node */}
      <div className="absolute left-[20px] z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0a0a0a] bg-accent shadow-[0_0_15px_var(--color-accent-glow)] md:left-1/2">
        <span className="absolute inset-0 rounded-full bg-accent/60 blur-sm" />
      </div>

      {/* Card */}
      <div className={`w-full pl-12 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-white/[0.07]">
          <div className={`mb-2 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <span className="mb-2 w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
              {item.period}
            </span>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-purple-300">
            {item.org}
            {item.location ? ` · ${item.location}` : ''}
          </p>

          {item.points.length > 0 && (
            <ul className={`space-y-1.5 text-sm leading-relaxed text-neutral-400 ${isEven ? 'md:text-right' : ''}`}>
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}

          {item.tags.length > 0 && (
            <div className={`mt-4 flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : ''}`}>
              {item.tags.map((tag) => (
                <BoxedText key={tag} text={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
