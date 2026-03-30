'use client'

import { useState } from 'react'
import { AnimatedSection, GradientText, TextReveal, MagneticButton } from 'lib/animations'
import type { ResumeHeader } from 'lib/resume-types'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'

interface ContactProps {
  header: ResumeHeader
}

export default function Contact({ header }: ContactProps) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(header.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${header.email}`
    }
  }

  const socialLinks = [
    {
      name: 'Email',
      icon: HiOutlineMail,
      href: `mailto:${header.email}`,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        copyEmail()
      },
    },
    {
      name: 'LinkedIn',
      icon: SiLinkedin,
      href: `https://linkedin.com/in/${header.linkedin}`,
    },
    {
      name: 'GitHub',
      icon: SiGithub,
      href: 'https://github.com/jayeshchotaliyaxD',
    },
  ]

  return (
    <AnimatedSection delay={0.7} className="">
      <div id="contact" className="flex flex-col items-center text-center gap-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          <GradientText>
            <TextReveal text="Let's Connect" mode="word" />
          </GradientText>
        </h2>

        <p className="text-neutral-400 text-sm max-w-md">
          Feel free to reach out for collaborations, opportunities, or just to say hello.
        </p>

        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {socialLinks.map((link) => (
            <MagneticButton key={link.name}>
              <a
                href={link.href}
                onClick={link.onClick}
                target={link.onClick ? undefined : '_blank'}
                rel={link.onClick ? undefined : 'noopener noreferrer'}
                className="relative flex items-center justify-center w-14 h-14 rounded-xl border border-neutral-700 bg-neutral-800/50 text-neutral-300 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all group"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            </MagneticButton>
          ))}
        </div>

        {/* Copy email feedback */}
        <button
          onClick={copyEmail}
          className="text-neutral-500 text-sm hover:text-accent transition-colors cursor-pointer"
        >
          {copied ? '✓ Copied to clipboard!' : `${header.email} — click to copy`}
        </button>

        {/* Location */}
        <p className="text-neutral-600 text-xs">
          {header.phone} • {header.location}
        </p>
      </div>
    </AnimatedSection>
  )
}
