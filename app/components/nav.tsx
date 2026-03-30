'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/blog', name: 'Blog' },
  { path: '/projects', name: 'Projects' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    setIsVisible(currentY < lastScrollY || currentY < 100)
    setLastScrollY(currentY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <nav className="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold italic text-white tracking-tight text-base hover:text-neutral-300 transition-colors"
        >
          JC
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, name }) => (
            <Link
              key={path}
              href={path}
              className={`relative px-3 py-1.5 text-sm transition-colors ${
                isActive(path)
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {name}
              {isActive(path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-x-1 -bottom-px h-[2px] bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <motion.path
              d={isMobileOpen ? 'M5 5L15 15' : 'M3 6H17'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <motion.path
              d={isMobileOpen ? 'M15 5L5 15' : 'M3 14H17'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden glass border-t border-white/[0.05]"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map(({ path, name }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(path)
                      ? 'text-white bg-white/[0.05]'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
