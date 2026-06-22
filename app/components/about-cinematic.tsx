'use client'

import { motion } from 'framer-motion'
import { GradientText } from 'lib/animations'

interface Stat {
  value: string
  label: string
}

interface AboutProps {
  profileSummary: string
  stats: Stat[]
}

export default function AboutCinematic({ profileSummary, stats }: AboutProps) {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: heading + summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About <GradientText>Me</GradientText>
          </h2>
          <p className="text-base leading-relaxed text-neutral-400 sm:text-lg">
            {profileSummary}
          </p>
        </motion.div>

        {/* Right: stat cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 gap-5 self-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-white/[0.07]"
            >
              <div className="mb-2 text-3xl font-bold sm:text-4xl">
                <GradientText>{stat.value}</GradientText>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
