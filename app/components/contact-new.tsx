'use client'

import { AnimatedSection } from 'lib/animations'
import type { ResumeHeader } from 'lib/resume-types'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'

interface ContactProps {
  header: ResumeHeader
}

export default function Contact({ header }: ContactProps) {
  return (
    <AnimatedSection delay={0.7} className="">
      <div className="flex flex-col gap-figma-inside-gap">
        <h2 className="font-semibold italic text-neutral-400">
          Contact
        </h2>
        
        <div className="flex flex-wrap gap-4 items-center">
          {/* Email */}
          <a
            href={`mailto:${header.email}`}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
          >
            <HiOutlineMail className="w-4 h-4" />
            <span className="text-sm underline underline-offset-4 decoration-neutral-600 group-hover:decoration-neutral-400">
              {header.email}
            </span>
          </a>
          
          {/* LinkedIn */}
          <a
            href={`https://linkedin.com/in/${header.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
          >
            <SiLinkedin className="w-4 h-4" />
            <span className="text-sm underline underline-offset-4 decoration-neutral-600 group-hover:decoration-neutral-400">
              LinkedIn
            </span>
          </a>
          
          {/* GitHub */}
          <a
            href="https://github.com/jayeshchotaliyaxD"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
          >
            <SiGithub className="w-4 h-4" />
            <span className="text-sm underline underline-offset-4 decoration-neutral-600 group-hover:decoration-neutral-400">
              GitHub
            </span>
          </a>
          
          {/* Resume Download - Commented out, download link was broken */}
          {/* 
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4c97f8] text-white text-sm font-medium hover:bg-[#6aabff] transition-colors"
          >
            <HiOutlineDocumentDownload className="w-4 h-4" />
            Resume
          </a>
          */}
        </div>
        
        <p className="text-neutral-500 text-xs mt-2">
          {header.phone} • {header.location}
        </p>
      </div>
    </AnimatedSection>
  )
}
