'use client'

import { motion } from 'framer-motion'
import { GradientText } from 'lib/animations'
import type { SkillCategory } from 'lib/resume-types'

interface SkillsProps {
  skills: SkillCategory[]
}

export default function SkillsArsenal({ skills }: SkillsProps) {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-28 md:py-36">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Technical <GradientText>Arsenal</GradientText>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            A full-spectrum toolkit spanning bare-metal firmware, embedded Linux,
            industrial protocols, and secure cloud connectivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-colors hover:border-accent/30 hover:bg-white/[0.07]"
            >
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 text-sm text-neutral-300 transition-all hover:border-white/30 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
