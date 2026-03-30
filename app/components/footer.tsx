'use client'

import Link from 'next/link'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { MagneticButton } from 'lib/animations'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/jayeshchotaliyaxD', icon: SiGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/jayeshchotaliya', icon: SiLinkedin },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mb-16 mt-16">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left: nav links + copyright */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-500 text-sm hover:text-neutral-200 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Jayesh Chotaliya | Embedded Software Engineer
          </p>
        </div>

        {/* Right: social links + back to top */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              className="text-neutral-600 hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href={link.url}
              aria-label={link.name}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}

          {/* Back to top */}
          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-400 hover:text-white hover:border-accent/40 transition-all flex items-center justify-center text-xs"
              aria-label="Back to top"
            >
              ↑
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
