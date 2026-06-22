'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GradientText } from 'lib/animations'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import type { ResumeHeader } from 'lib/resume-types'

interface ContactProps {
  header: ResumeHeader
}

export default function ContactCinematic({ header }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${header.email}?subject=${subject}&body=${body}`
  }

  const socials = [
    { name: 'GitHub', icon: SiGithub, href: 'https://github.com/jayeshchotaliyaxD' },
    { name: 'LinkedIn', icon: SiLinkedin, href: `https://linkedin.com/in/${header.linkedin}` },
  ]

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[450px] w-[450px] rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 lg:grid-cols-2">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s work <br />
            <GradientText>together.</GradientText>
          </h2>
          <p className="mb-10 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
            Open to embedded software, firmware, and industrial IoT roles and
            collaborations. Have an idea or a role in mind? Let&apos;s talk.
          </p>

          <a
            href={`mailto:${header.email}`}
            className="group mb-8 flex items-center gap-4 text-neutral-300 transition-colors hover:text-white"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
              <HiOutlineMail className="h-5 w-5" />
            </span>
            <span className="text-lg">{header.email}</span>
          </a>

          <div className="mb-12 flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-white"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-1"
          >
            <FiDownload className="h-4 w-4" />
            Download Résumé
          </a>
        </motion.div>

        {/* Right: mailto form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-400">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-400">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the role or project..."
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-accent to-purple-600 py-4 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
