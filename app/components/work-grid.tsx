'use client'

import { motion } from 'framer-motion'
import type { Project } from 'lib/resume-types'

interface WorkGridProps {
  projects: Project[]
}

const fallbackProjects: Project[] = [
  {
    name: 'Secure Industrial IoT Gateway',
    organization: 'ABB Global Industries and Services',
    date: '2023 - Present',
    bullets: [
      'Cloud-connected gateway architecture using TPM-backed identity and Azure IoT Hub.',
      'Telemetry, provisioning, and remote management pipelines for industrial drives.',
    ],
  },
  {
    name: 'OPC UA Data Exchange',
    organization: 'Industrial Automation',
    date: '2024',
    bullets: [
      'Server/client modules for standardized equipment data exchange.',
      'Real-time monitoring flows across embedded Linux and drive systems.',
    ],
  },
]

export default function WorkGrid({ projects }: WorkGridProps) {
  const items = [...projects, ...fallbackProjects].slice(0, 4)

  return (
    <section id="work" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-15%] h-[520px] w-[520px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[560px] w-[560px] rounded-full bg-orange-600/12 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-orange-200/80">
            Selected work
          </p>
          <h2 className="font-sans text-4xl font-black leading-tight tracking-[-0.05em] text-white sm:text-6xl">
            Case studies built around reliability, speed, and secure connectivity.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((project, index) => (
            <motion.article
              key={`${project.name}-${index}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-orange-300/30 hover:bg-white/[0.09]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute left-[-20%] top-[-20%] h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute bottom-[-20%] right-[-20%] h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
                      {project.organization}
                    </p>
                    <h3 className="font-sans text-2xl font-bold leading-tight text-white">
                      {project.name}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    {project.date}
                  </span>
                </div>

                <ul className="mt-auto space-y-3 text-sm leading-relaxed text-neutral-300">
                  {project.bullets.slice(0, 2).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
